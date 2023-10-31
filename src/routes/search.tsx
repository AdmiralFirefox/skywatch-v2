import { useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAppSelector } from "../app/redux_hooks";
import { WeatherAQIContext } from "../context/WeatherAQIContext";
import { fetchWeatherData } from "../utils/fetchWeatherData";
import { fetchAQIData } from "../utils/fetchAQI";
import Navbar from "../components/Navbar/Navbar";
import SearchForm from "../components/Search/SearchForm";
import SectionOne from "../components/Search/SectionOne";
import SectionTwo from "../components/Search/SectionTwo";
import { WeatherProps } from "../types/WeatherTypes";
import { AQIProps } from "../types/AQITypes";
import styles from "../styles/search/SearchPage.module.scss";

const Search = () => {
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

  // Main Background
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
          <div className={styles["weather-card"]}>
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
          </div>
        )}
      </main>
    </>
  );
};

export default Search;
