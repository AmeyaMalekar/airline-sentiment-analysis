from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import nltk
from nltk.tokenize import TweetTokenizer
from nltk.corpus import stopwords
from string import punctuation
from nltk.stem import WordNetLemmatizer
from autocorrect import Speller
from sklearn.preprocessing import LabelEncoder
import os

nltk.download('stopwords')

app = Flask(__name__)

# Apply CORS with specific settings for /predict route only
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Initialize components
tweet_tok = TweetTokenizer()
spell = Speller(lang='en')
stop_nltk = stopwords.words("english")
stop_updated = stop_nltk + ['user', 'https://t.co.', 'http://t.co/', '...', 'http co']
lemm = WordNetLemmatizer()

# Load model and vectorizer
model = joblib.load(os.path.join(os.getcwd(), 'models', 'sentiment_analysis_model.pkl'))
count_vect = joblib.load(os.path.join(os.getcwd(), 'models', 'vectorizer.pkl'))

# Initialize LabelEncoder and fit it
label_encoder = LabelEncoder()
label_encoder.fit(["Negative", "Neutral", "Positive"])

def clean_text(text):
    tokens = tweet_tok.tokenize(text.lower())
    # Lemmatize and remove stopwords/punctuation
    stemmed = [lemm.lemmatize(term) for term in tokens if term not in stop_updated and term not in list(punctuation) and len(term) > 2]
    stemmed_tok = [word for word in stemmed if word.isalpha()]
    # Correct spelling
    stemmed_tokens = [spell(word) for word in stemmed_tok]
    return ' '.join(stemmed_tokens)

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        # Handle preflight request
        return jsonify({'message': 'CORS preflight successful'}), 200

    try:
        # Get tweet data from the request
        data = request.get_json()
        tweet = data.get('tweet', '')
        if not tweet:
            raise ValueError("No tweet provided")

        # Clean the tweet and vectorize it
        cleaned_tweet = clean_text(tweet)
        vectorized_tweet = count_vect.transform([cleaned_tweet])

        # Make prediction
        prediction = model.predict(vectorized_tweet)

        # Get sentiment from the label encoder
        sentiment = label_encoder.inverse_transform(prediction)

        return jsonify({'sentiment': sentiment[0]})
    
    except Exception as e:
        # Log error details for debugging
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app with the appropriate settings
    app.run(debug=True, host='0.0.0.0', port=8000)
