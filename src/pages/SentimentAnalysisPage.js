import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import FuzzySearch from "fuzzy-search";
import Sentiment from "sentiment";
import "./SentimentAnalysisPage.css"; 

const SentimentAnalysisPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterField, setFilterField] = useState("airline_sentiment");
  const [filterValue, setFilterValue] = useState("");
  const [uniqueValues, setUniqueValues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sentimentResult, setSentimentResult] = useState(null);

  const sentimentAnalyzer = new Sentiment();

  // Load
  useEffect(() => {
    d3.csv(`${process.env.PUBLIC_URL}/Tweets.csv`)
      .then((csvData) => {
        setData(csvData);
        updateUniqueValues(csvData, filterField);
      })
      .catch((error) => console.error("Error loading CSV file:", error));
  }, []);

  // Update unique values when the filter field changes
  useEffect(() => {
    updateUniqueValues(data, filterField);
  }, [filterField, data]);

  const updateUniqueValues = (csvData, field) => {
    const uniqueFilterValues = Array.from(
      new Set(csvData.map((item) => item[field]))
    ).filter((value) => value);
    setUniqueValues(uniqueFilterValues);

    if (uniqueFilterValues.length > 0) {
      setFilterValue(uniqueFilterValues[0]); // Default filter value
      setFilteredData(csvData.filter((item) => item[field] === uniqueFilterValues[0]));
    } else {
      setFilterValue("");
      setFilteredData([]);
    }
  };

  // Update filtered data when filter value changes
  useEffect(() => {
    if (filterValue) {
      setFilteredData(data.filter((item) => item[filterField] === filterValue));
    }
  }, [filterValue, filterField, data]);

  const handleSentimentAnalysis = (tweet) => {
    const sentiment = sentimentAnalyzer.analyze(tweet);
    setSentimentResult(sentiment);
  };

  const handleFuzzySearch = () => {
    if (!uniqueValues || uniqueValues.length === 0) return [];
    const fuzzySearcher = new FuzzySearch(uniqueValues);
    return fuzzySearcher.search(searchQuery);
  };

  return (
    <div className="sentiment-analysis-page">
      <header>
        <h1>Sentiment Analysis Page</h1>
      </header>

      <main className="content">
        {/* Sidebar for Filtering */}
        <aside className="sidebar">
          <h2>Filter Tweets</h2>
          <div className="filter-group">
            <label htmlFor="filterField">Select field to filter by:</label>
            <select
              id="filterField"
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
            >
              <option value="airline_sentiment">Airline Sentiment</option>
              <option value="airline">Airline</option>
              <option value="user_timezone">User Timezone</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filterValue">Select value for the selected field:</label>
            <select
              id="filterValue"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              {uniqueValues.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <section className="tweets">
          <h2>Filtered Tweets</h2>
          {filteredData.length > 0 ? (
            <ul className="tweet-list">
              {filteredData.map((tweet, index) => (
                <li key={index} className="tweet-item">
                  <p><strong>Tweet ID:</strong> {tweet.tweet_id}</p>
                  <p><strong>Airline:</strong> {tweet.airline}</p>
                  <p><strong>Sentiment:</strong> {tweet.airline_sentiment}</p>
                  <p><strong>Text:</strong> {tweet.text}</p>
                  <button
                    className="analyze-button"
                    onClick={() => handleSentimentAnalysis(tweet.text)}
                  >
                    Analyze Sentiment
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tweets found for the selected filter.</p>
          )}
        </section>

        {/* Sentiment Analysis Result */}
        {sentimentResult && (
          <section className="sentiment-result">
            <h2>Sentiment Analysis Result</h2>
            <pre>{JSON.stringify(sentimentResult, null, 2)}</pre>
          </section>
        )}

        {/* Fuzzy Search */}
        <section className="fuzzy-search">
          <h2>Fuzzy Search</h2>
          <label htmlFor="searchQuery">Search Airline or User Timezone:</label>
          <input
            id="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <ul className="fuzzy-suggestions">
              {handleFuzzySearch().map((match, index) => (
                <li key={index}>{match}</li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default SentimentAnalysisPage;
