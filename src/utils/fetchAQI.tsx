import Axios from "axios";

export const fetchAQIData = async (latitude: string, longitude: string) => {
  return await Axios.get(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );
};
