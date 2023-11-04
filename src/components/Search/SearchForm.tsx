import { useState, useRef, ChangeEvent } from "react";
import { useAppDispatch } from "../../app/redux_hooks";
import { setSearchValue } from "../../features/search/searchSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import AutoComplete from "./AutoComplete";
import styles from "../../styles/search/SearchForm.module.scss";

const SearchForm = () => {
  const [showAutoComplete, setShowAutoComplete] = useState(true);
  const [searchPlace, setSearchPlace] = useState("");
  const debouncedSearchPlace = useDebounce<string>(searchPlace, 700);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autoCompleteRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPlace(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchValue(searchPlace));

    if (inputRef.current) {
      inputRef.current.blur();
    }

    setSearchPlace("");
  };

  const handleClickInside = () => {
    setShowAutoComplete(true);
  };

  const handleClickOutside = () => {
    setShowAutoComplete(false);
  };

  const selectCountry = (selectedPlace: string) => {
    dispatch(setSearchValue(selectedPlace));
    setShowAutoComplete(false);
    setSearchPlace("");
  };

  useOnClickOutside(autoCompleteRef, handleClickOutside);

  return (
    <form className={styles["search-form"]} onSubmit={handleSubmit}>
      <div className={styles["input"]} ref={autoCompleteRef}>
        <input
          type="text"
          placeholder="Search a City/Country"
          onChange={handleChange}
          onClick={handleClickInside}
          value={searchPlace}
          ref={inputRef}
          required
        />
        {showAutoComplete && (
          <AutoComplete
            searchPlace={debouncedSearchPlace}
            selectCountry={selectCountry}
          />
        )}
      </div>
      <button type="submit" className={styles["button"]}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
