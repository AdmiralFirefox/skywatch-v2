import { formatDate } from "../../utils/formatDate";
import styles from "../../styles/search/SectionOne.module.scss";

interface SectionOneProps {
  weatherLocation: string | undefined;
  locationDate: number | undefined;
  weatherIcon: string | undefined;
  weatherCondition: string | undefined;
  mainTemp: number | undefined;
  minTemp: number | undefined;
  maxTemp: number | undefined;
}

const SectionOne = ({
  weatherLocation,
  locationDate,
  weatherIcon,
  weatherCondition,
  mainTemp,
  minTemp,
  maxTemp,
}: SectionOneProps) => {
  return (
    <div className={styles["section-one"]}>
      <div className={styles["section-one-info"]}>
        <p>{weatherLocation}</p>
        <p>{formatDate(locationDate as number)}</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
          alt="Weather Icon"
        />
        <p>{weatherCondition}</p>
      </div>
      <div className={styles["section-one-temp"]}>
        <h1>{`${Math.round(mainTemp as number)}°`}</h1>
        <div>
          <h2>{`${Math.round(minTemp as number)}°`}</h2>
          <h2>{`${Math.round(maxTemp as number)}°`}</h2>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
