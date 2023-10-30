import { useState, useRef, ChangeEvent } from "react";
import { useAppDispatch } from "../../app/redux_hooks";
import { setSearchValue } from "../../features/search/searchSlice";
import styles from "../../styles/search/SearchForm.module.scss";

const SearchForm = () => {
  const [searchPlace, setSearchPlace] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
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
  };

  return (
    <form className={styles["search-form"]} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search a City/Country"
        onChange={handleChange}
        value={searchPlace}
        ref={inputRef}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
