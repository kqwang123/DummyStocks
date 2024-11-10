from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

import pandas as pd
from bs4 import BeautifulSoup

import finnhub

from dotenv import load_dotenv
import os

def create_app():
    
    app = Flask(__name__)
    CORS(app)

    # News API endpoint
    NEWS_API_URL = 'https://newsapi.org/v2/everything'
    load_dotenv()

    FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')
    NEWS_API_API_KEY = os.getenv('NEWS_API_API_KEY')
    finnhub_client = finnhub.Client(api_key=FINNHUB_API_KEY)

    @app.route('/search', methods=['GET'])
    def search():
        # Get the keyword from the form
        keywords = request.args.get('keywords')
        
        # Make a request to the News API with the specified keyword
        params = {
            'q': keywords,
            'apiKey': NEWS_API_API_KEY,
            'pageSize': 10  # Limit results to 10 articles
        }
        response = requests.get(NEWS_API_URL, params=params)
        
        # Check if the response was successful
        if response.status_code == 200:
            articles = response.json()['articles']
        else:
            articles = []
            error_message = "Error fetching news articles"
            print(error_message)
                
        return articles

    @app.route('/scrape', methods=['GET'])
    def scrape():
        url = request.args.get('url')
        
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            
            article = soup.find('article')  
            if article:
                return article.get_text(strip=True)  
            else:
                return "Article content not found."
        else:
            return f"Failed to retrieve URL: {response.status_code}"
        
    @app.route('/get_stock', methods=['GET'])
    def get_stock():

        print(finnhub_client.earnings_calendar(_from="2021-06-10", to="2021-06-30", symbol="", international=False))

    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

    return app
