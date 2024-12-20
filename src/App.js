import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Taskbar from "./components/Taskbar";
import HomePage from "./pages/HomePage";
import SentimentAnalysisModelDashboardPage from "./pages/SentimentAnalysisModelDashboardPage";
import SentimentAnalysisPage from "./pages/SentimentAnalysisPage";
import SentimentSearchPage from "./pages/SentimentSearchPage";

function App() {
  return (
    <Router>
      <Taskbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sentiment-analysis-model-dash" element={<SentimentAnalysisModelDashboardPage />} />
        <Route path="/sentiment-analysis" element={<SentimentAnalysisPage />} />
        <Route path="/sentiment-search" element={<SentimentSearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;