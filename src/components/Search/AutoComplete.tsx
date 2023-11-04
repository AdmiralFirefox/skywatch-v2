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

interface AutoCompleteProps {
  searchPlace: string;
  selectCountry: (selectedPlace: string) => void;
}

const AutoComplete = ({ searchPlace, selectCountry }: AutoCompleteProps) => {
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
                  className={styles["select-button"]}
                  onClick={() =>
                    selectCountry(`${country.name}, ${country.country}`)
                  }
                >
                  {country.name}, {country.region}, {country.country}
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
