import { useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import Axios from "axios";
import { useAppSelector } from "../app/redux_hooks";
import Navbar from "../components/Navbar/Navbar";
import SearchForm from "../components/Search/SearchForm";
import WeatherData from "../components/Search/WeatherData";
import { WeatherProps } from "../types/WeatherTypes";
import styles from "../styles/search/SearchPage.module.scss";

const fetchData = async (place: string) => {
  return await Axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );
};

const Search = () => {
  const searchedPlace = useAppSelector((state) => state.search.searchValue);

  const { data, isLoading, isError }: UseQueryResult<WeatherProps, Error> =
    useQuery<WeatherProps, Error>({
      queryKey: ["weather", searchedPlace],
      queryFn: () => fetchData(searchedPlace),
      staleTime: 30000,
      enabled: Boolean(searchedPlace),
    });

  useEffect(() => {
    document.getElementsByTagName("body")[0].className = styles["main-bg"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className={styles["container"]}>
        <SearchForm />

        {searchedPlace === "" ? (
          <div>
            <h1>Search for a City to get started</h1>
          </div>
        ) : isLoading ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : isError ? (
          <div>
            <h1>Error</h1>
          </div>
        ) : (
          <WeatherData
            weatherLocation={`${data?.data.name}, ${data?.data.sys.country}`}
            locationDate={data?.data.timezone}
            weatherIcon={data?.data.weather[0].icon}
            weatherCondition={data?.data.weather[0].description}
            mainTemp={data?.data.main.temp}
            minTemp={data?.data.main.temp_min}
            maxTemp={data?.data.main.temp_max}
          />
        )}
      </main>
    </>
  );
};

export default Search;
