import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";
import { db } from "../firebase/firebase";
import { useAppDispatch } from "../app/redux_hooks";
import { setSearchValue } from "../features/search/searchSlice";
import { getTimePassed } from "../utils/getTimePassed";
import { AuthContext } from "../context/AuthContext";
import SearchImage from "../assets/icons/search.png";
import SignInImage from "../assets/icons/sign-in.png";
import Navbar from "../components/Navbar/Navbar";
import DeleteSearchesModal from "../components/Modal/DeleteSearchesModal";
import Loading from "../components/Placeholder/Loading";
import Placeholder from "../components/Placeholder/Placeholder";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { SearchHistoryProps } from "../types/SearchHistoryTypes";
import { toast } from "react-toastify";
import styles from "../styles/search_history/SearchHistory.module.scss";

const SearchHistory = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchedCountries, setSearchedCountries] = useState<
    SearchHistoryProps[]
  >([]);
  const [deleteSearchesModal, setDeleteSearchesModal] = useState(false);
  const [loadingSearches, setLoadingSearches] = useState(false);

  const goToSearchPage = (searchedPlace: string | undefined) => {
    navigate("/search");
    dispatch(setSearchValue(searchedPlace as string));
  };

  // Delete Searches Modal
  const openDeleteSearchesModal = () => {
    setDeleteSearchesModal(true);
  };

  const closeDeleteSearchesModal = () => {
    setDeleteSearchesModal(false);
  };

  // Deleting a country from the collection
  const deleteSearchedCountry = async (docId: string) => {
    const docRef = doc(db, "searched_countries", docId);
    await deleteDoc(docRef);
  };

  const handleDelete = (docId: string) => {
    deleteSearchedCountry(docId).then(() => {
      setSearchedCountries(
        searchedCountries.filter((country) => country.id !== docId)
      );
    });
  };

  // Deleting all searched countries from the collection
  const deleteAllSearchedCountries = async () => {
    const searchedCountriesRef = collection(db, "searched_countries");
    const q = query(searchedCountriesRef, where("owner", "==", user!.uid));

    const snapshot = await getDocs(q);
    snapshot.docs.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };

  const handleDeleteAll = () => {
    deleteAllSearchedCountries().then(() => {
      setSearchedCountries([]);
      setDeleteSearchesModal(false);
    });

    toast.error("Cleared search history", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Getting searched countries from the collection
  useEffect(() => {
    setLoadingSearches(true);
    if (user) {
      const searchedCountriesRef = collection(db, "searched_countries");
      const q = query(
        searchedCountriesRef,
        orderBy("time_searched", "desc"),
        where("owner", "==", user!.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const searchedCountries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSearchedCountries(searchedCountries);
        setLoadingSearches(false);
      });

      // Clean up function
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
          subtitle="Sign in to keep track of your recent searches."
        />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {searchedCountries.length === 0 && !loadingSearches ? (
        <Placeholder
          image={SearchImage}
          title="You have no recent searches."
          subtitle="Try searching for a city or country."
        />
      ) : loadingSearches ? (
        <Loading />
      ) : (
        <main className={styles["history-card"]}>
          <div className={styles["header"]}>
            <h1>Recent Searches</h1>
            {searchedCountries.length === 0 ? null : (
              <button onClick={openDeleteSearchesModal}>
                Clear Search History
              </button>
            )}
          </div>

          <ul className={styles["cards-container"]}>
            {searchedCountries.map((country) => (
              <li key={country.id} className={styles["country-card"]}>
                <button
                  className={styles["delete-country"]}
                  onClick={() => handleDelete(country.id)}
                >
                  <IconContext.Provider
                    value={{ className: styles["delete-icon"] }}
                  >
                    <AiFillCloseCircle />
                  </IconContext.Provider>
                </button>
                <div className={styles["first-section"]}>
                  <img
                    src={`https://openweathermap.org/img/wn/${country.icon}.png`}
                    alt="Weather Icon"
                  />
                  <div>
                    <h1 className={styles["country-temp"]}>{`${Math.round(
                      country.temp as number
                    )}°`}</h1>
                    <button onClick={() => goToSearchPage(country.place)}>
                      <h1 className={styles["country-name"]}>
                        {country.place}
                      </h1>
                    </button>
                  </div>
                </div>
                <div className={styles["second-section"]}>
                  <p>
                    {country.time_searched! === null ||
                    country.time_searched! === undefined
                      ? "a few seconds ago"
                      : getTimePassed(
                          dayjs(country.time_searched!.seconds * 1000).format(
                            "MMMM D YYYY, h:mm:ss a"
                          )
                        )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </main>
      )}

      <DeleteSearchesModal
        deleteSearchesModal={deleteSearchesModal}
        closeDeleteSearchesModal={closeDeleteSearchesModal}
        handleDeleteAll={handleDeleteAll}
      />
    </>
  );
};

export default SearchHistory;
