import { useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import styles from "../../styles/placeholder/LoadingApp.module.scss";

const LoadingApp = () => {
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = styles["main-bg"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  return (
    <div className={styles["loading"]}>
      <SyncLoader color="#daf3f7" size={17} />
      <h1>Loading...</h1>
    </div>
  );
};

export default LoadingApp;
