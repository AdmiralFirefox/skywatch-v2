import styles from "../../styles/search/SearchForm.module.scss";

const SearchForm = () => {
  return (
    <>
      <form className={styles["search-form"]}>
        <input type="text" placeholder="Search a City/Country" required />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default SearchForm;
