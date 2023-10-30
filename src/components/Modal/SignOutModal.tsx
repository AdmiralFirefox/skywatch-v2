import { useWindowSize } from "../../hooks/useWindowSize";
import { FaSignOutAlt } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { motion, AnimatePresence } from "framer-motion";
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
      <AnimatePresence>
        {signOutModal && (
          <motion.div
            className={styles["backdrop"]}
            style={{ height: windowHeight }}
            onClick={closeSignOutModal}
            key="sign-out-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {signOutModal && (
          <motion.div
            className={styles["modal"]}
            style={{ maxHeight: `calc(${windowHeight}px - 10vh)` }}
            key="sign-out-modal"
            initial={{ opacity: 0, top: "45%" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "45%" }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <button
              className={styles["close-button"]}
              onClick={closeSignOutModal}
            >
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
                <IconContext.Provider value={{ className: styles["icon"] }}>
                  <FaSignOutAlt />
                </IconContext.Provider>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SignOutModal;
