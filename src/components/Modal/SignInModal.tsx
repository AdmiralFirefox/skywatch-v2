import { useWindowSize } from "../../hooks/useWindowSize";
import GoogleLogo from "../../assets/icons/google.png";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/modal/SignInModal.module.scss";

interface SignInModalProps {
  signInModal: boolean;
  closeSignInModal: () => void;
  signInWithgoogle: () => Promise<void>;
}

const SignInModal = ({
  signInModal,
  closeSignInModal,
  signInWithgoogle,
}: SignInModalProps) => {
  const { height: windowHeight } = useWindowSize();

  return (
    <>
      <AnimatePresence>
        {signInModal && (
          <motion.div
            className={styles["backdrop"]}
            style={{ height: windowHeight }}
            onClick={closeSignInModal}
            key="sign-in-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {signInModal && (
          <motion.div
            className={styles["modal"]}
            style={{ maxHeight: `calc(${windowHeight}px - 10vh)` }}
            key="sign-in-modal"
            initial={{ opacity: 0, top: "45%" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "45%" }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <button
              className={styles["close-button"]}
              onClick={closeSignInModal}
            >
              <IconContext.Provider value={{ className: styles["icon"] }}>
                <AiFillCloseCircle />
              </IconContext.Provider>
            </button>
            <h1>Sign In with Google</h1>
            <p>Sign in to use the various features of SkyWatch.</p>
            <button
              onClick={signInWithgoogle}
              className={styles["google-button"]}
            >
              Sign In <img src={GoogleLogo} alt="Google Logo" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SignInModal;
