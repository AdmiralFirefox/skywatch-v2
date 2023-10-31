import { createContext } from "react";

export const WeatherAQIContext = createContext({
  aqiMainData: 0,
  aqiLoading: false,
  aqiError: false,
});
