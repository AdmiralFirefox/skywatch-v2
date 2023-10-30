import { useWindowSize } from "../../hooks/useWindowSize";
import { FaSignOutAlt } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import styles from "../../styles/modal/SignOutModal.module.scss";

interface SignOutModalProps {
  signOutModal: boolean;
  closeSignOutModal: () => void;
  userPhoto: string | undefined;
  userName: string | undefined;
  userEmail: string | undefined;
  signOutAccount: () => Promise<void>;
}

const SignOutModal = ({
  signOutModal,
  closeSignOutModal,
  userPhoto,
  userName,
  userEmail,
  signOutAccount,
}: SignOutModalProps) => {
  const { height: windowHeight } = useWindowSize();

  return (
    <>
      {signOutModal && (
        <div
          className={styles["backdrop"]}
          style={{ height: windowHeight }}
          onClick={closeSignOutModal}
        ></div>
      )}

      {signOutModal && (
        <div
          className={styles["modal"]}
          style={{ maxHeight: `calc(${windowHeight}px - 10vh)` }}
        >
          <button className={styles["close-button"]} onClick={closeSignOutModal}>
            <IconContext.Provider value={{ className: styles["icon"] }}>
              <AiFillCloseCircle />
            </IconContext.Provider>
          </button>

          <div className={styles["user-info"]}>
            <img src={userPhoto} alt="User Photo" />
            <div className={styles["content"]}>
              <p>{userName}</p>
              <p>{userEmail}</p>
            </div>
          </div>

          <div className={styles["sign-out-button"]}>
            <button onClick={signOutAccount}>
              Sign Out{" "}
              <IconContext.Provider
                value={{ className: styles["icon"] }}
              >
                <FaSignOutAlt />
              </IconContext.Provider>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignOutModal;
