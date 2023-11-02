import SyncLoader from "react-spinners/SyncLoader";
import styles from "../../styles/placeholder/Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles["loading"]}>
      <SyncLoader color="#daf3f7" size={17} />
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
