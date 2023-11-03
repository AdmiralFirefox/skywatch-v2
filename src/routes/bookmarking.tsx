import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/bookmarking/Bookmarking.module.scss";

const Bookmarking = () => {
  // Main Background
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = styles["main-bg"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className={styles["bookmark-card"]}>
        <div className={styles["header"]}>
          <h1>Your Bookmarks</h1>
        </div>
      </main>
    </>
  );
};

export default Bookmarking;
