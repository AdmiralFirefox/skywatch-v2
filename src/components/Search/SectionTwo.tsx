import { timeZoneOffset } from "../../utils/timeZoneOffset";
import Sunrise from "../../assets/icons/sunrise.png";
import Sunset from "../../assets/icons/sunset.png";
import Humidity from "../../assets/icons/humidity.png";
import Pressure from "../../assets/icons/pressure.png";
import Wind from "../../assets/icons/wind.png";
import Visibility from "../../assets/icons/visibility.png";
import Cloudiness from "../../assets/icons/cloudy-day.png";
import WeatherAQI from "./WeatherAQI";
import styles from "../../styles/search/SectionTwo.module.scss";

interface WeatherCardProps {
  cardLabel: string;
  cardValue: string;
  cardImage: string;
}

interface SectionTwoProps {
  timezone: number | undefined;
  sunrise: number | undefined;
  sunset: number | undefined;
  humidity: number | undefined;
  pressure: number | undefined;
  wind: number | undefined;
  visibility: number | undefined;
  cloudiness: number | undefined;
}

const WeatherCard = ({ cardLabel, cardValue, cardImage }: WeatherCardProps) => {
  return (
    <div className={styles["section-two-card"]}>
      <div>
        <p>{cardLabel}</p>
        <p>{cardValue}</p>
      </div>
      <img src={cardImage} alt="Sunrise Icon" />
    </div>
  );
};

const SectionTwo = ({
  timezone,
  sunrise,
  sunset,
  humidity,
  pressure,
  wind,
  visibility,
  cloudiness,
}: SectionTwoProps) => {
  return (
    <div className={styles["section-two"]}>
      <WeatherCard
        cardLabel="Sunrise"
        cardValue={timeZoneOffset(sunrise as number, timezone as number)}
        cardImage={Sunrise}
      />
      <WeatherCard
        cardLabel="Sunset"
        cardValue={timeZoneOffset(sunset as number, timezone as number)}
        cardImage={Sunset}
      />
      <WeatherCard
        cardLabel="Humidity"
        cardValue={`${humidity as number}%`}
        cardImage={Humidity}
      />
      <WeatherCard
        cardLabel="Pressure"
        cardValue={`${pressure as number} hPa`}
        cardImage={Pressure}
      />
      <WeatherCard
        cardLabel="Wind"
        cardValue={`${wind as number} m/s`}
        cardImage={Wind}
      />
      <WeatherCard
        cardLabel="Visibility"
        cardValue={`${Math.round((visibility as number) / 1000)} km`}
        cardImage={Visibility}
      />
      <WeatherCard
        cardLabel="Cloudinesss"
        cardValue={`${cloudiness as number}%`}
        cardImage={Cloudiness}
      />
      <WeatherAQI />
    </div>
  );
};

export default SectionTwo;
