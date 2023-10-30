import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchForm from "../components/Search/SearchForm";
import styles from "../styles/search/SearchPage.module.scss";

const Search = () => {
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = styles["main-bg"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

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
