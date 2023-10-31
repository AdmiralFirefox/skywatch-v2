import { useState, useContext } from "react";
import InfoAQIModal from "../Modal/InfoAQIModal";
import { WeatherAQIContext } from "../../context/WeatherAQIContext";
import BeatLoader from "react-spinners/BeatLoader";
import { AiFillInfoCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import styles from "../../styles/search/WeatherAQI.module.scss";

interface CloseIconProps {
  openInfoModal: () => void;
}

const CloseIcon = ({ openInfoModal }: CloseIconProps) => {
  return (
    <button className={styles["close-button"]} onClick={openInfoModal}>
      <IconContext.Provider value={{ className: styles["icon"] }}>
        <AiFillInfoCircle />
      </IconContext.Provider>
    </button>
  );
};

const WeatherAQI = () => {
  const { aqiMainData, aqiLoading, aqiError } = useContext(WeatherAQIContext);
  const [infoModal, setInfoModal] = useState(false);

  const openInfoModal = () => {
    setInfoModal(true);
  };

  const closeInfoModal = () => {
    setInfoModal(false);
  };

  return (
    <>
      {aqiLoading ? (
        <div className={styles["loading"]}>
          <CloseIcon openInfoModal={openInfoModal} />
          <p>Air Quality Index</p>
          <BeatLoader color="#18425A" size={12} />
        </div>
      ) : aqiError ? (
        <div className={styles["error"]}>
          <CloseIcon openInfoModal={openInfoModal} />
          <p>Air Quality Index</p>
          <p>---</p>
        </div>
      ) : (
        <>
          {aqiMainData === 1 || aqiMainData === 2 ? (
            <div className={styles["air-quality-index-good"]}>
              <CloseIcon openInfoModal={openInfoModal} />
              <p>Air Quality Index</p>
              <p>{aqiMainData}</p>
            </div>
          ) : aqiMainData === 3 ? (
            <div className={styles["air-quality-index-fair"]}>
              <CloseIcon openInfoModal={openInfoModal} />
              <p>Air Quality Index</p>
              <p>{aqiMainData}</p>
            </div>
          ) : aqiMainData === 4 ? (
            <div className={styles["air-quality-index-poor"]}>
              <CloseIcon openInfoModal={openInfoModal} />
              <p>Air Quality Index</p>
              <p>{aqiMainData}</p>
            </div>
          ) : (
            <div className={styles["air-quality-index-very-poor"]}>
              <CloseIcon openInfoModal={openInfoModal} />
              <p>Air Quality Index</p>
              <p>{aqiMainData}</p>
            </div>
          )}
        </>
      )}

      <InfoAQIModal infoModal={infoModal} closeInfoModal={closeInfoModal} />
    </>
  );
};

export default WeatherAQI;
