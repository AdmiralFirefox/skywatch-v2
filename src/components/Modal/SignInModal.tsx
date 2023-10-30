import { useWindowSize } from "../../hooks/useWindowSize";
import GoogleLogo from "../../assets/icons/google.png";
import styles from "../../styles/modal/SignInModal.module.scss";

interface SignInModalProps {
  signInModal: boolean;
  closeSignInModal: () => void;
  signInWithgoogle: () => Promise<void>;
}

const SignInModal = ({ signInModal, closeSignInModal, signInWithgoogle }: SignInModalProps) => {
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
          <h1>Sign In with Google</h1>
          <p>Sign in to use the various features of SkyWatch.</p>
          <button onClick={signInWithgoogle}>
            Sign In <img src={GoogleLogo} alt="Google Logo" />
          </button>
        </div>
      )}
    </>
  );
};

export default SignInModal;
