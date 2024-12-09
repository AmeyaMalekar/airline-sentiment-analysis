import React, { useState } from "react";
import axios from "axios";
import "./SentimentSearchPage.css";

function SentimentSearchPage() {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTweetChange = (e) => {
    setTweet(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tweet) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/predict", {
        tweet: tweet,
      });
      setSentiment(response.data.sentiment);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching the sentiment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sentiment-search-page">
      <header>
        <h1>Sentiment Search</h1>
      </header>
      <div className="content">
        <p className="description">Enter a tweet and get its sentiment!</p>

        <form onSubmit={handleSubmit} className="sentiment-form">
          <textarea
            value={tweet}
            onChange={handleTweetChange}
            placeholder="Enter a tweet about an airline"
            rows="4"
            cols="50"
            className="tweet-input"
          />
          <br />
          <button type="submit" disabled={loading} className="analyze-button">
            {loading ? "Analyzing..." : "Analyze Sentiment"}
          </button>
        </form>

        <div className="feedback-section">
          <div className="sentiment-result-placeholder">
            {sentiment ? <h3>Sentiment: {sentiment}</h3> : null}
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default SentimentSearchPage;
