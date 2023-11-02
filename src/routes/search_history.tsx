import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAppDispatch } from "../app/redux_hooks";
import { setSearchValue } from "../features/search/searchSlice";
import { getTimePassed } from "../utils/getTimePassed";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import { SearchHistoryProps } from "../types/SearchHistoryTypes";
import styles from "../styles/search_history/SearchHistory.module.scss";
import dayjs from "dayjs";

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
            {searchedCountries.map((country, i) => (
              <button
                key={i}
                className={styles["country-card"]}
                onClick={() => goToSearchPage(country.place)}
              >
                <div className={styles["first-section"]}>
                  <img
                    src={`https://openweathermap.org/img/wn/${country.icon}.png`}
                    alt="Weather Icon"
                  />
                  <div>
                    <h1>{`${Math.round(country.temp as number)}°`}</h1>
                    <h1>{country.place}</h1>
                  </div>
                </div>

                <div className={styles["second-section"]}>
                  <p>
                    {country.time_searched!.seconds !== undefined &&
                      getTimePassed(
                        dayjs(country.time_searched!.seconds * 1000).format(
                          "MMMM D YYYY, h:mm:ss a"
                        )
                      )}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default SearchHistory;
