import styles from "../../styles/placeholder/Placeholder.module.scss";

interface PlaceholderProps {
  image: string;
  title: string;
  subtitle: string;
}

const Placeholder = ({ image, title, subtitle }: PlaceholderProps) => {
  return (
    <div className={styles["wrapper"]}>
      <img src={image} alt="" />
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default Placeholder;
