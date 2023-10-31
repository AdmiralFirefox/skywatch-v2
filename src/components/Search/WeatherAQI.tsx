import { useContext } from "react";
import { WeatherAQIContext } from "../../context/WeatherAQIContext";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "../../styles/search/WeatherAQI.module.scss";

const WeatherAQI = () => {
  const { aqiMainData, aqiLoading, aqiError } = useContext(WeatherAQIContext);

  return (
    <>
      {aqiLoading ? (
        <div className={styles["loading"]}>
          <p>Air Quality Index</p>
          <BeatLoader color="#18425A" size={12} />
        </div>
      ) : aqiError ? (
        <div className={styles["error"]}>
          <p>Air Quality Index</p>
          <p>---</p>
        </div>
      ) : (
        <>
          {aqiMainData === 1 || aqiMainData === 2 ? (
            <div className={styles["air-quality-index-good"]}>
              <p>Air Quality Index</p>
              <p>{aqiMainData}</p>
            </div>
          ) : aqiMainData === 3 ? (
            <div className={styles["air-quality-index-fair"]}>
              <p>Air Quality Index</p>
              <p>{aqiMainData}</p>
            </div>
          ) : aqiMainData === 4 ? (
            <div className={styles["air-quality-index-poor"]}>
              <p>Air Quality Index</p>
              <p>{aqiMainData}</p>
            </div>
          ) : (
            <div className={styles["air-quality-index-very-poor"]}>
              <p>Air Quality Index</p>
              <p>{aqiMainData}</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WeatherAQI;
