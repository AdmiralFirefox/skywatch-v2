import Axios from "axios";

export const fetchForecastData = async (place: string) => {
  return await Axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );
};
