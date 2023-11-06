import { useEffect } from "react";
import { Link } from "react-router-dom";
import WebLogo from "./assets/web-logo.png";
import styles from "./styles/Home.module.scss";

function Home() {
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = styles["home-body"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  return (
    <main>
      <section className={styles["home-card"]}>
        <img src={WebLogo} alt="Web Logo" />
        <h1>SkyWatch 2: A Global Weather Monitoring System</h1>
        <p>
          A weather application to know the weather of a specific place, either
          be a city or country.
        </p>
        <Link to="/search">Start Searching</Link>
      </section>
    </main>
  );
}

export default Home;
