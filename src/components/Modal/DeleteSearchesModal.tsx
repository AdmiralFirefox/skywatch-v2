import { useWindowSize } from "../../hooks/useWindowSize";
import useLockedBody from "../../hooks/useLockedBody";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/modal/DeleteSearchesModal.module.scss";

interface DeleteSearchesModalProps {
  deleteSearchesModal: boolean;
  closeDeleteSearchesModal: () => void;
}

const DeleteSearchesModal = ({
  deleteSearchesModal,
  closeDeleteSearchesModal,
}: DeleteSearchesModalProps) => {
  const { height: windowHeight } = useWindowSize();

  useLockedBody(deleteSearchesModal, "root");
  return (
    <>
      <AnimatePresence>
        {deleteSearchesModal && (
          <motion.div
            className={styles["backdrop"]}
            style={{ height: windowHeight }}
            onClick={closeDeleteSearchesModal}
            key="delete-searches-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteSearchesModal && (
          <motion.div
            className={styles["modal"]}
            style={{ maxHeight: `calc(${windowHeight}px - 10vh)` }}
            key="delete-searches-modal"
            initial={{ opacity: 0, top: "45%" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "45%" }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <h1>Are you sure you want to delete all your searches?</h1>
            <div className={styles["button-wrapper"]}>
              <button onClick={closeDeleteSearchesModal}>Yes</button>
              <button onClick={closeDeleteSearchesModal}>No</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteSearchesModal;
