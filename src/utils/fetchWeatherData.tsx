import Axios from "axios";

export const fetchWeatherData = async (place: string) => {
  return await Axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );
};
