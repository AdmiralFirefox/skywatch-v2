import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase";
import SignInModal from "../Modal/SignInModal";
import SignOutModal from "../Modal/SignOutModal";
import User from "../../assets/icons/user.png";
import { AiFillHome } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import styles from "../../styles/navbar/Navbar.module.scss";

const Navbar = () => {
  const [signInModal, setSignInModal] = useState(false);
  const [signOutModal, setSignOutModal] = useState(false);
  const user = useContext(AuthContext);

  // Sign In
  const openSignInModal = () => {
    setSignInModal(true);
  };

  const closeSignInModal = () => {
    setSignInModal(false);
  };

  // Sign Out
  const openSignOutModal = () => {
    setSignOutModal(true);
  };

  const closeSignOutModal = () => {
    setSignOutModal(false);
  };

  // Google Sign In
  const signInWithgoogle = async () => {
    const provider = new GoogleAuthProvider();

    auth.useDeviceLanguage();

    try {
      await signInWithPopup(auth, provider);

      setSignInModal(false);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  // Sign Out
  const signOutAccount = async () => {
    await signOut(auth);

    setSignOutModal(false);
  };

  return (
    <>
      <header className={styles["navbar"]}>
        <Link to="/" className={styles["nav-icon"]}>
          <AiFillHome />
        </Link>
        <Link to="/search_history" className={styles["nav-icon"]}>
          <FaHistory />
        </Link>
        <Link to="/bookmarking" className={styles["nav-icon"]}>
          <AiFillHeart />
        </Link>
        {user ? (
          <button className={styles["user-icon"]} onClick={openSignOutModal}>
            <img src={user.photoURL} alt="User" referrerPolicy="no-referrer" />
          </button>
        ) : (
          <button className={styles["user-icon"]} onClick={openSignInModal}>
            <img src={User} alt="User" />
          </button>
        )}
      </header>

      {user ? (
        <SignOutModal
          signOutModal={signOutModal}
          closeSignOutModal={closeSignOutModal}
          signOutAccount={signOutAccount}
          userPhoto={user?.photoURL}
          userName={user?.displayName}
          userEmail={user?.email}
        />
      ) : (
        <SignInModal
          signInModal={signInModal}
          closeSignInModal={closeSignInModal}
          signInWithgoogle={signInWithgoogle}
        />
      )}
    </>
  );
};

export default Navbar;