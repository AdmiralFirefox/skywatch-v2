import Axios from "axios";

const BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const fetchAutoCompleteData = async (url_params: string) => {
  const res = await Axios.get(`${BASE_URL}/places?${url_params}`, options);

  return res.data;
};
