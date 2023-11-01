import { useState, useEffect, useContext } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { useAppSelector } from "../app/redux_hooks";
import { WeatherAQIContext } from "../context/WeatherAQIContext";
import { fetchWeatherData } from "../utils/fetchWeatherData";
import { fetchAQIData } from "../utils/fetchAQI";
import { fetchForecastData } from "../utils/fetchForecastData";
import Navbar from "../components/Navbar/Navbar";
import SearchForm from "../components/Search/SearchForm";
import SectionOne from "../components/Search/SectionOne";
import SectionTwo from "../components/Search/SectionTwo";
import SectionThree from "../components/Search/SectionThree";
import { WeatherProps } from "../types/WeatherTypes";
import { AQIProps } from "../types/AQITypes";
import { ForecastProps } from "../types/ForecastTypes";
import SyncLoader from "react-spinners/SyncLoader";
import styles from "../styles/search/SearchPage.module.scss";

const Search = () => {
  const user = useContext(AuthContext);
  const searchedPlace = useAppSelector((state) => state.search.searchValue);

  // Weather Data
  const { data, isLoading, isError }: UseQueryResult<WeatherProps, Error> =
    useQuery<WeatherProps, Error>({
      queryKey: ["weather", searchedPlace],
      queryFn: () => fetchWeatherData(searchedPlace),
      staleTime: 30000,
      enabled: Boolean(searchedPlace),
    });

  // AQI Data
  const latitude = data?.data.coord.lat;
  const longitude = data?.data.coord.lon;

  const {
    data: aqiData,
    isLoading: aqiLoading,
    isError: aqiError,
  }: UseQueryResult<AQIProps, Error> = useQuery<AQIProps, Error>({
    queryKey: ["aqi", { latitude, longitude }],
    queryFn: () => fetchAQIData(latitude!.toString(), longitude!.toString()),
    staleTime: 30000,
    enabled: Boolean({ latitude, longitude }),
  });

  const aqiMainData = aqiData?.data.list[0].main.aqi as number;

  const WeatherAQI = {
    aqiMainData,
    aqiLoading,
    aqiError,
  };

  // Forecast Data
  const {
    data: forecastData,
    isLoading: forecastLoading,
    isError: forecastError,
  }: UseQueryResult<ForecastProps, Error> = useQuery<ForecastProps, Error>({
    queryKey: ["forecast", searchedPlace],
    queryFn: () => fetchForecastData(searchedPlace),
    staleTime: 30000,
    enabled: Boolean(searchedPlace),
  });

  // Check day/night time cycle
  const [changeTheme, setChangeTheme] = useState("");

  let currentTime = new Date().getTime();
  currentTime = (currentTime - (currentTime % 1000)) / 1000;

  const timestamp = currentTime;
  const timeZoneOffset = data?.data.timezone;
  const date = new Date(timestamp * 1000);
  const localTimestamp =
    timestamp + date.getTimezoneOffset() * 60 + timeZoneOffset!;
  const localDate = new Date(localTimestamp * 1000);
  const localHour = localDate.getHours();
  const isDayTime = localHour >= 6 && localHour < 18;

  // Main Background
  useEffect(() => {
    if (isDayTime) {
      setChangeTheme("day");
    } else if (data?.data.timezone === undefined) {
      setChangeTheme(changeTheme);
    } else {
      setChangeTheme("night");
    }

    if (changeTheme === "") {
      document.getElementsByTagName("body")[0].className = styles["main-bg"];
    } else if (changeTheme === "day") {
      document.getElementsByTagName("body")[0].className =
        styles["main-bg-day"];
    } else {
      document.getElementsByTagName("body")[0].className =
        styles["main-bg-night"];
    }

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, [isDayTime, changeTheme, data?.data.timezone]);

  // Add Queries to Search History
  useEffect(() => {
    if (data?.data !== undefined) {
      const searchedCountriesRef = collection(db, "searched_countries");
      const placeValue = `${data?.data.name}, ${data?.data.sys.country}`;

      const q = query(searchedCountriesRef, where("place", "==", placeValue));

      const addToHistory = async () => {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // Document exists, update the time_searched value
          const docRef = doc(
            db,
            "searched_countries",
            querySnapshot.docs[0].id
          );
          await updateDoc(docRef, {
            time_searched: serverTimestamp(),
          });
        } else {
          // Document doesn't exist, add a new document
          await addDoc(searchedCountriesRef, {
            time_searched: serverTimestamp(),
            place: placeValue,
            temp: data?.data.main.temp,
            icon: data?.data.weather[0].icon,
          });
        }
      };

      addToHistory();
    }
  }, [data?.data, user]);

  return (
    <>
      <Navbar />

      <main className={styles["container"]}>
        <SearchForm />

        {searchedPlace === "" ? (
          <section className={styles["initial-content-card"]}>
            <h1>Search for a City or Country</h1>
            <p>Suggestion: Try searching your place to get started.</p>
          </section>
        ) : isLoading ? (
          <div
            className={styles["loading-card"]}
            style={{
              background:
                changeTheme === ""
                  ? "hsla(182, 13%, 42%, 0.7)"
                  : changeTheme === "day"
                  ? "hsla(202, 58%, 35%, 0.75)"
                  : "hsla(254, 14%, 45%, 0.75)",
            }}
          >
            <div className={styles["loader-wrapper"]}>
              <SyncLoader color="#daf3f7" size={20} />
            </div>
            <h1>Loading...</h1>
          </div>
        ) : isError ? (
          <section
            className={styles["error-card"]}
            style={{
              background:
                changeTheme === ""
                  ? "hsla(182, 13%, 42%, 0.7)"
                  : changeTheme === "day"
                  ? "hsla(202, 58%, 35%, 0.75)"
                  : "hsla(254, 14%, 45%, 0.75)",
            }}
          >
            <h1>We couldn't find what you're looking for</h1>
            <p>Double check your spelling and make sure that place exist.</p>
          </section>
        ) : (
          <div
            className={styles["weather-card"]}
            style={{
              background:
                changeTheme === ""
                  ? "hsla(182, 13%, 42%, 0.7)"
                  : changeTheme === "day"
                  ? "hsla(202, 58%, 35%, 0.75)"
                  : "hsla(254, 14%, 45%, 0.75)",
            }}
          >
            <SectionOne
              weatherLocation={`${data?.data.name}, ${data?.data.sys.country}`}
              locationDate={data?.data.timezone}
              weatherIcon={data?.data.weather[0].icon}
              weatherCondition={data?.data.weather[0].description}
              mainTemp={data?.data.main.temp}
              minTemp={data?.data.main.temp_min}
              maxTemp={data?.data.main.temp_max}
            />
            <WeatherAQIContext.Provider value={WeatherAQI}>
              <SectionTwo
                timezone={data?.data.timezone}
                sunrise={data?.data.sys.sunrise}
                sunset={data?.data.sys.sunset}
                humidity={data?.data.main.humidity}
                pressure={data?.data.main.pressure}
                wind={data?.data.wind.speed}
                visibility={data?.data.visibility}
                cloudiness={data?.data.clouds.all}
              />
            </WeatherAQIContext.Provider>
            <SectionThree
              forecastData={forecastData?.data}
              forecastLoading={forecastLoading}
              forecastError={forecastError}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Search;
