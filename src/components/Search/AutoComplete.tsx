import { useState, useEffect, useRef } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchAutoCompleteData } from "../../utils/fetchAutoCompleteData";
import { useWindowSize } from "../../hooks/useWindowSize";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "../../styles/search/AutoComplete.module.scss";

interface AutoCompleteDataTypes {
  data: {
    name: string;
    country: string;
    region: string;
  }[];
}

type AutoCompleteDataRef = { name: string; country: string; region: string };

interface AutoCompleteProps {
  searchPlace: string;
  selectCountry: (selectedPlace: string) => void;
}

const AutoComplete = ({ searchPlace, selectCountry }: AutoCompleteProps) => {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState(-1);
  const focusedCountry = useRef<AutoCompleteDataRef | null | undefined>(null);
  const { height } = useWindowSize();

  const {
    data,
    isLoading,
    isError,
  }: UseQueryResult<AutoCompleteDataTypes, Error> = useQuery<
    AutoCompleteDataTypes,
    Error
  >({
    queryKey: ["autocomplete", searchPlace],
    queryFn: () =>
      fetchAutoCompleteData(`namePrefix=${searchPlace}&minPopulation=5000`),
    staleTime: 30000,
    enabled: Boolean(searchPlace),
  });

  useEffect(() => {
    const handleKeyDown = (event: {
      key: string;
      preventDefault: () => void;
    }) => {
      if (event.key === "ArrowDown") {
        setFocusedButtonIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % data!.data.length;
          focusedCountry.current = data?.data[nextIndex];
          return nextIndex;
        });
      } else if (event.key === "ArrowUp") {
        setFocusedButtonIndex((prevIndex) => {
          const nextIndex =
            (prevIndex - 1 + data!.data.length) % data!.data.length;
          focusedCountry.current = data?.data[nextIndex];
          return nextIndex;
        });
      } else if (event.key === "Enter" && focusedCountry.current) {
        event.preventDefault();
        selectCountry(
          `${focusedCountry.current.name}, ${focusedCountry.current.country}`
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, data?.data, data?.data.length, selectCountry]);

  return (
    <>
      {isLoading ? (
        <div className={styles["loader"]}>
          <BeatLoader color="#000000" size={10} />
        </div>
      ) : isError ? (
        ""
      ) : (
        <>
          {data?.data !== undefined ? (
            <div
              className={styles["container"]}
              style={{ maxHeight: `calc(${height}px - 47vh)` }}
            >
              {data?.data.map((country, i) => (
                <button
                  key={i}
                  style={{ maxHeight: `calc(${height}px - 47vh)` }}
                  className={
                    i === focusedButtonIndex
                      ? styles["select-button-active"]
                      : styles["select-button"]
                  }
                  onClick={() =>
                    selectCountry(`${country.name}, ${country.country}`)
                  }
                >
                  <span className={styles["country-name"]}>{country.name}</span>
                  <br />
                  <span className={styles["country-region"]}>
                    {country.region}, {country.country}
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default AutoComplete;
