import React, { useState, useEffect } from "react";

import "./SentimentAnalysisModelDashboardPage.css";

const SentimentAnalyisModelDashboardPage = () => {
  const charts = [
    { src: "/Model_Accuracy.png", 
      alt: "Chart 1", 
      title: "Sentiment Analysis: Model Comparison for Multiple Accuracy Metrics",
      description: "This chart shows the comparison of all models including the Vader and TextBlob models along with other ML models. This shows the accuracy along with AUC-ROC and F-1 score to determine the best model. We find that the Logistic Regression Model performs the best against all the models for the aformemntioned metrics." },
    ];

  const charts_sec = [
    { src: "/confusion_matrices.png", 
      alt: "Chart 5", 
      title: "Sentiment Analysis: Confusion Matrix for All Models",
      description: "This is a confusion matrix for all models including the Vader and TextBlob Models showing predicted vs. true values for each sentiment. This shows that both the Vader and TextBlob models struggle with sentiment prediction resulting in many incorrect values. This implies that neither of these models will be useful for sentiment prediction. Among the other ML models, we see much better prediction capabilities across the board. However, the model that performs the best is the Logistic Regression model, confirming our hypothesis from the chart exploring model accuracy metrics. Thus, we will use the logistic regression model in the backend to predict sentiment." }
    ];

  const charts_third = [
    { src: "/Feature_Importance_Chart.png", 
      alt: "Chart 2", 
      title: "Sentiment Analysis Model: Feature Coefficient Importance Chart", 
      description: "This shows the importance of each feature (word) to predict sentiment in our logistic regression model. We can see the words with large coefficients for each sentiment. This gives insight about the kinds of words that are associated with a certain sentiment. Furthermore, we can understand the weights our model gives to important factors which influence the decision of sentiment prediction."}
    ];
   
  const charts_four = [
    { src: "/Precision_Recall_Curve.png", 
      alt: "Chart 3", 
      title: "Sentiment Analysis Model: Logistic Regression Precision-Recall Curve",
      description: "This shows the precision-recall curve for each predicted sentiment, giving us insight into each class' (predicted sentiment) precision vs. their recall. The Precision-Recall curve is particularly valuable when evaluating models on imbalanced datasets like tweets which tend to be more negative, as it directly reflects the model's ability to identify positive cases without being influenced by the overwhelming number of negative cases. The precision-recall curve shows us the tradeoff between precision and recall for each of the classified sentiments."},
    { src: "/ROC_Curve.png", 
      alt: "Chart 4", 
      title: "Sentiment Analysis Model: Logistic Regression ROC Curve",
      description: "This shows the ROC curve for each predicted sentiment, showing us the tradeoff between specificity and sensitivity. A model with a higher area under the ROC curve (AUC) indicates better overall performance. This chart helps evaluate the performance of a model by visualizing the trade-off between true positive rate and false positive rate across different thresholds. A good ROC curve suggests that the model is effectively identifying both positive and negative sentiments, with minimal misclassification."}
    ];

  // Components for different levels
  const LevelOne = ({ chart }) => {
    console.log("Rendering LevelOne");
    return (
      <section className="chart-section">
        <h2>{chart.title}</h2>
        <img src={chart.src} alt={chart.title} className="chart-image" />
        <p>{chart.description}</p>
      </section>
    );
  }

  const LevelTwo = ({ chart }) => {
    console.log("Rendering LevelTwo with chart:", chart);  // Debugging line
    return (
      <section className="chart-section">
        <h2>{chart.title}</h2>
        <img src={chart.src} alt={chart.title} className="chart-image" />
        <p>{chart.description}</p>
      </section>
    );
  };

  const LevelThree = ({ chart }) => {
    console.log("Rendering LevelThree");
    return (
      <section className="chart-section">
        <h2>{chart.title}</h2>
        <img src={chart.src} alt={chart.title} className="chart-image" />
        <p>{chart.description}</p>
      </section>
    );
  }

  const LevelFour = ({ charts }) => {
    console.log("Rendering LevelFour");
    return (
      <section className="chart-section">
        <section className="two-charts">
          {charts.map((chart, index) => (
            <div key={index} className="chart-container">
              <h2>{chart.title}</h2>
              <img src={chart.src} alt={chart.title} className="chart-image" />
              <p>{chart.description}</p>
            </div>
          ))}
        </section>
      </section>
    );
  }

  return (
    <div className="sentiment-analysis-model-dash">
      <header>
        <h1>Sentiment Analysis Model Dashboard</h1>
      </header>

      <section className="content">        
        {/* Level 1 */}
        <LevelOne chart={charts[0]} />

        {/* Level 2 */}
        <LevelTwo chart={charts_sec[0]} />

        {/* Level 3 */}
        <LevelThree chart={charts_third[0]} />

        {/* Level 4 */}
        <LevelFour charts={charts_four} />
      </section>
    </div>
  );
}

export default SentimentAnalyisModelDashboardPage;