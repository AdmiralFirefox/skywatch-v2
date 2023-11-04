import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/redux_hooks";
import { setSearchValue } from "../../features/search/searchSlice";
import SyncLoader from "react-spinners/SyncLoader";
import styles from "../../styles/search/CurrentLocation.module.scss";

interface LocationData {
  name: string;
  country: string;
}

const CurrentLocation = () => {
  const dispatch = useAppDispatch();
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [showLocation, setShowLocation] = useState(false);

  const setLocation = () => {
    dispatch(setSearchValue(`${locationData!.name}, ${locationData!.country}`));
  };

  useEffect(() => {
    let watchId: number;

    if ("geolocation" in navigator) {
      setShowLocation(true);
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`
          )
            .then((response) => response.json())
            .then((data) => {
              const { name, country } = data[0];
              setLocationData({ name, country });
            })
            .catch((error) => {
              console.error(
                "Error occurred while fetching location data from API",
                error
              );
              setShowLocation(false);
            });
        },
        (error) => {
          console.error("Error occurred while getting location", error);
          setShowLocation(false);
        }
      );
    } else {
      console.log("Geolocation is not available");
      setShowLocation(false);
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <>
      {showLocation ? (
        <div className={styles["location-section"]}>
          <p>Your Detected Current Location:</p>
          {locationData ? (
            <button onClick={setLocation}>
              {locationData!.name}, {locationData!.country}
            </button>
          ) : (
            <div className={styles["loader-wrapper"]}>
              <SyncLoader color="#daf3f7" size={14} />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default CurrentLocation;
