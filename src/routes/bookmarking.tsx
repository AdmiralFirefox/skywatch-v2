import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import { useAppDispatch } from "../app/redux_hooks";
import { setSearchValue } from "../features/search/searchSlice";
import SignInImage from "../assets/icons/sign-in.png";
import FavoritesImage from "../assets/icons/magnifying-glass.png";
import Navbar from "../components/Navbar/Navbar";
import Loading from "../components/Placeholder/Loading";
import Placeholder from "../components/Placeholder/Placeholder";
import { AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { BookmarProps } from "../types/BookmarkTypes";
import styles from "../styles/bookmarking/Bookmarking.module.scss";

const Bookmarking = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [bookmarks, setBookmarks] = useState<BookmarProps[]>([]);
  const [loadingBookmarks, setLoadingBookmarks] = useState(false);

  const goToSearchPage = (searchedPlace: string | undefined) => {
    navigate("/search");
    dispatch(setSearchValue(searchedPlace as string));
  };

  // Deleting a country from bookmarks
  const deleteBookmarkedCountry = async (docId: string) => {
    const docRef = doc(db, "bookmarks", docId);
    await deleteDoc(docRef);
  };

  const handleDelete = (docId: string) => {
    deleteBookmarkedCountry(docId).then(() => {
      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== docId));
    });
  };

  // Getting bookmarks from the collection
  useEffect(() => {
    setLoadingBookmarks(true);
    if (user) {
      const bookmarksRef = collection(db, "bookmarks");
      const q = query(bookmarksRef, orderBy("time_added", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const bookmarks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookmarks(bookmarks);
        setLoadingBookmarks(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  // Main Background
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = styles["main-bg"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  if (!user) {
    return (
      <>
        <Navbar />
        <Placeholder
          image={SignInImage}
          title="You are not signed in."
          subtitle="Please sign in to use the bookmarking feature of SkyWatch."
        />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {bookmarks.length === 0 && !loadingBookmarks ? (
        <Placeholder
          image={FavoritesImage}
          title="You have no recent bookmarks."
          subtitle="Try searching for a city or country and bookmark them."
        />
      ) : loadingBookmarks ? (
        <Loading />
      ) : (
        <main className={styles["bookmark-card"]}>
          <div className={styles["header"]}>
            <h1>Your Bookmarks</h1>
          </div>

          <ul className={styles["card-container"]}>
            {bookmarks.map((bookmark) => (
              <li key={bookmark.id} className={styles["card"]}>
                <button
                  onClick={() => goToSearchPage(bookmark.place)}
                  className={styles["place-button"]}
                >
                  <h1>{bookmark.place}</h1>
                </button>
                <button
                  className={styles["icon-button"]}
                  onClick={() => handleDelete(bookmark.id)}
                >
                  <IconContext.Provider value={{ className: styles["icon"] }}>
                    <AiFillHeart />
                  </IconContext.Provider>
                </button>
              </li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
};

export default Bookmarking;
