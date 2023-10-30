import { useWindowSize } from "../../hooks/useWindowSize";
import { FaSignOutAlt } from "react-icons/fa";
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
          <div className={styles["user-info"]}>
            <img src={userPhoto} alt="User Photo" />
            <div className={styles["content"]}>
              <p>{userName}</p>
              <p>{userEmail}</p>
            </div>
          </div>

          <div className={styles["button-wrapper"]}>
            <button onClick={signOutAccount}>
              Sign Out{" "}
              <IconContext.Provider
                value={{ className: styles["sign-out-icon"] }}
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
