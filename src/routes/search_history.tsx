import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/search_history/SearchHistory.module.scss";

const SearchHistory = () => {
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = styles["main-bg"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className={styles["history-card"]}>
        <div className={styles["header"]}>
          <h1>Recent Searches</h1>
          <button>Clear Search History</button>
        </div>
      </main>
    </>
  );
};

export default SearchHistory;
