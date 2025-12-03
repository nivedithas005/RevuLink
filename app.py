from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import random

# If you want to implement real scraping/AI later, you would import libraries here:
# from textblob import TextBlob
# from youtube_search import YoutubeSearch

app = Flask(__name__)
CORS(app)  # This allows your Chrome Extension to talk to this local server

@app.route('/analyze', methods=['POST'])
def analyze_product():
    data = request.json
    product_title = data.get('query', 'Unknown Product')
    
    print(f"Received request to analyze: {product_title}")

    # --- SIMULATION LOGIC ---
    # In a real version, you would:
    # 1. Search YouTube for 'product_title review'
    # 2. Scrape comments
    # 3. Run Sentiment Analysis (TextBlob/VADER)
    
    # For now, we simulate the AI processing time
    time.sleep(1.5) 

    # Mock Response (Dynamic based on input length to vary results)
    base_score = 7.5 + (len(product_title) % 20) / 10.0
    
    response = {
        "rating": round(min(base_score, 9.8), 1),
        "sentiment": "Positive" if base_score > 7 else "Mixed",
        "total_reviews": random.randint(50, 200),
        "pros": [
            "Good value for money",
            "Excellent build quality",
            "Responsive customer support"
        ],
        "cons": [
            "Battery life could be better",
            "Limited color options"
        ],
        "videos": [
            {
                "title": f"Is the {product_title[:15]}... worth it?",
                "channel": "TechReviewer",
                "sentiment": "Positive"
            },
            {
                "title": "Don't buy until you watch this!",
                "channel": "GadgetGeek",
                "sentiment": "Neutral"
            }
        ]
    }

    return jsonify(response)

if __name__ == '__main__':
    print("RevuLink AI Server running on port 5000...")
    app.run(debug=True, port=5000)
