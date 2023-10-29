import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase";
import styles from "../../styles/navbar/Navbar.module.scss";

const Navbar = () => {
  const user = useContext(AuthContext);

  return (
    <header className={styles["navbar"]}>
      <h1>Navbar</h1>
    </header>
  );
};

export default Navbar;
