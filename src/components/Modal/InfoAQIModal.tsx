import { useWindowSize } from "../../hooks/useWindowSize";
import useLockedBody from "../../hooks/useLockedBody";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/modal/InfoAQIModal.module.scss";

interface InfoAQIModalProps {
  infoModal: boolean;
  closeInfoModal: () => void;
}

const InfoAQIModal = ({ infoModal, closeInfoModal }: InfoAQIModalProps) => {
  const { height: windowHeight } = useWindowSize();

  useLockedBody(infoModal, "root");
  return (
    <>
      <AnimatePresence>
        {infoModal && (
          <motion.div
            className={styles["backdrop"]}
            style={{ height: windowHeight }}
            onClick={closeInfoModal}
            key="info-aqi-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {infoModal && (
          <motion.div
            className={styles["modal"]}
            style={{ maxHeight: `calc(${windowHeight}px - 10vh)` }}
            key="info-aqi-modal"
            initial={{ opacity: 0, top: "45%" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "45%" }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <h1>What is AQI?</h1>
            <p>
              The Air Quality Index (AQI) is a system that is used to tell the
              air quality of a place. It tells you how clean or polluted is the
              air. The AQI can be categorized into the following:
            </p>
            <p>
              1 - Good <br />
              2 - Fair <br />
              3 - Moderate <br />
              4 - Poor <br />
              5 - Very Poor <br />
            </p>
            <button
              onClick={closeInfoModal}
              className={styles["google-button"]}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InfoAQIModal;
