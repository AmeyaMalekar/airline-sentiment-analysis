import React from "react";
import { Link } from "react-router-dom";
import planeIcon from "../assets/icons/plane-f-svgrepo-com.svg";

function Taskbar() {
  return (
    <div style={styles.taskbar}>
      <Link to="/" style={styles.logo}>
        <img src={planeIcon} alt="Airline Logo" style={styles.logoIcon} />
        AirlineTweetML
      </Link>
      <nav style={styles.navLinks}>
        <Link to="/dataset" style={styles.navLink}>
          Dataset
        </Link>
        <Link to="/sentiment-analysis" style={styles.navLink}>
          Sentiment Analysis
        </Link>
        <Link to="/sentiment-search" style={styles.navLink}>
          Sentiment Search
        </Link>
      </nav>
    </div>
  );
}

const styles = {
  taskbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderBottom: "1px solid grey",
    padding: "0.5rem 1rem",
    color: "black",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    color: "black",
    textDecoration: "none",
    gap: "0.5rem",
  },
  logoIcon: {
    width: "30px",
    height: "30px",
  },
  navLinks: {
    display: "flex",
    gap: "1rem",
  },
  navLink: {
    color: "black",
    textDecoration: "none",
    fontSize: "1rem",
  },
};

export default Taskbar;
