import { useEffect } from "react";
import { useAppSelector } from "../app/redux_hooks";
import Navbar from "../components/Navbar/Navbar";
import SearchForm from "../components/Search/SearchForm";
import styles from "../styles/search/SearchPage.module.scss";

const Search = () => {
  const searchedPlace = useAppSelector((state) => state.search.searchValue);

  useEffect(() => {
    document.getElementsByTagName("body")[0].className = styles["main-bg"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  console.log(searchedPlace);

  return (
    <>
      <Navbar />

      <main className={styles["container"]}>
        <SearchForm />
      </main>
    </>
  );
};

export default Search;
