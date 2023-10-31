import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { formatDay, formatTime } from "../../utils/formatDate";
import { SectionThreeProps } from "../../types/ForecastTypes";
import styles from "../../styles/search/SectionThree.module.scss";

const SectionThree = ({
  forecastData,
  forecastLoading,
  forecastError,
}: SectionThreeProps) => {
  return (
    <>
      {forecastLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : forecastError ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <Swiper
          className={styles["swiper-container"]}
          navigation={true}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            330: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            650: {
              slidesPerView: 4,
              spaceBetween: 15,
            },

            760: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
          }}
        >
          {forecastData!.list.map((data, i) => (
            <SwiperSlide className={styles["swiper-slide"]} key={i}>
              <p>{formatDay(data.dt, forecastData!.city.timezone)}</p>
              <p>{formatTime(data.dt, forecastData!.city.timezone)}</p>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt="Weather Icon"
              />
              <p>{`${Math.round(Number(data.main.temp))}°`}</p>
              <p>{data.weather[0].main}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default SectionThree;
