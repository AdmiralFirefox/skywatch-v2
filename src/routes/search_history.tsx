import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import dayjs from "dayjs";
import { db } from "../firebase/firebase";
import { useAppDispatch } from "../app/redux_hooks";
import { setSearchValue } from "../features/search/searchSlice";
import { getTimePassed } from "../utils/getTimePassed";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { SearchHistoryProps } from "../types/SearchHistoryTypes";
import styles from "../styles/search_history/SearchHistory.module.scss";

const SearchHistory = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchedCountries, setSearchedCountries] = useState<
    SearchHistoryProps[]
  >([]);
  const [loadingSearches, setLoadingSearches] = useState(false);

  const goToSearchPage = (searchedPlace: string | undefined) => {
    navigate("/search");
    dispatch(setSearchValue(searchedPlace as string));
  };

  // Deleting a country
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

  // Getting searched countries from the collection
  useEffect(() => {
    setLoadingSearches(true);
    if (user) {
      const getSearchedCountries = async () => {
        const searchedCountriesRef = collection(db, "searched_countries");
        const q = query(searchedCountriesRef, orderBy("time_searched", "desc"));

        const snapshot = await getDocs(q);
        const searchedCountries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSearchedCountries(searchedCountries);
        setLoadingSearches(false);
      };

      getSearchedCountries();
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
        <h1>Not Signed in</h1>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className={styles["history-card"]}>
        <div className={styles["header"]}>
          <h1>Recent Searches</h1>
          <button>Clear Search History</button>
        </div>

        {searchedCountries.length === 0 && !loadingSearches ? (
          <div>
            <h1>You have no recent searches</h1>
          </div>
        ) : loadingSearches ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className={styles["cards-container"]}>
            {searchedCountries.map((country) => (
              <div key={country.id} className={styles["country-card"]}>
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
                    {country.time_searched!.seconds === null
                      ? "null"
                      : getTimePassed(
                          dayjs(country.time_searched!.seconds * 1000).format(
                            "MMMM D YYYY, h:mm:ss a"
                          )
                        )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default SearchHistory;
