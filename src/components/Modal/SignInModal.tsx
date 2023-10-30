import { useWindowSize } from "../../hooks/useWindowSize";
import GoogleLogo from "../../assets/icons/google.png";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
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
      {signInModal && (
        <div
          className={styles["backdrop"]}
          style={{ height: windowHeight }}
          onClick={closeSignInModal}
        ></div>
      )}

      {signInModal && (
        <div
          className={styles["modal"]}
          style={{ maxHeight: `calc(${windowHeight}px - 10vh)` }}
        >
          <button className={styles["close-button"]} onClick={closeSignInModal}>
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
        </div>
      )}
    </>
  );
};

export default SignInModal;
