import React from "react";
import graphIcon from "../assets/icons/graph-up-svgrepo-com.svg";
import sentimentAnalysisIcon from "../assets/icons/analysis-program-svgrepo-com.svg";
import sentimentSearchIcon from "../assets/icons/search-alt-2-svgrepo-com.svg";

function HomePage() {
  return (
    <div style={styles.container}>
      {/* Title and Description */}
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome to AirlineTweetML</h1>
        <p style={styles.description}>
          Your gateway to understanding airline sentiment through the power of
          machine learning and NLP.
        </p>
      </div>

      {/* Icons Section */}
      <div style={styles.iconsContainer}>
        <div style={styles.icon}>
          <a href="/sentiment-analysis-model-dash" style={styles.iconLink}>
            <img src={graphIcon} alt="Dataset" style={styles.iconImage} />
            <p style={styles.iconText}>Sentiment Analysis Model Dashboard</p>
          </a>
        </div>
        <div style={styles.icon}>
          <a href="/sentiment-analysis" style={styles.iconLink}>
            <img
              src={sentimentAnalysisIcon}
              alt="Sentiment Analysis"
              style={styles.iconImage}
            />
            <p style={styles.iconText}>Sentiment Analysis</p>
          </a>
        </div>
        <div style={styles.icon}>
          <a href="/sentiment-search" style={styles.iconLink}>
            <img
              src={sentimentSearchIcon}
              alt="Sentiment Search"
              style={styles.iconImage}
            />
            <p style={styles.iconText}>Sentiment Search</p>
          </a>
        </div>
      </div>

      {/* Call To Action Section */}
      <div style={styles.ctaContainer}>
        <p style={styles.ctaText}>Start exploring now!</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    marginTop: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    color: "#666",
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5rem",
    marginTop: "4rem",
  },
  icon: {
    width: "150px",
    height: "150px",
    backgroundColor: "#fff",
    borderRadius: "25px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "1rem",
  },
  iconLink: {
    textDecoration: "none",
    color: "#333",
  },
  iconImage: {
    width: "60px",
    height: "60px",
    marginBottom: "0.5rem",
  },
  iconText: {
    fontSize: "1rem",
    marginTop: "0.5rem",
  },
  ctaContainer: {
    backgroundColor: "#FFA500",
    padding: "0.5rem 1rem",
    borderRadius: "15px",
    marginTop: "3rem",
    textAlign: "center",
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
  },
  ctaText: {
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
};

export default HomePage;