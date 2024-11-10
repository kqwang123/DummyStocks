from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

import pandas as pd
from bs4 import BeautifulSoup

from config import TWELVE_DATA_API_KEY, NEWS_API_API_KEY

app = Flask(__name__)
CORS(app)

# News API endpoint
NEWS_API_URL = 'https://newsapi.org/v2/everything'

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

# @app.route('/api/stock_data', methods=['GET'])
# def stock_data():
#     symbol = request.args.get('symbol', 'AAPL')
#     interval = request.args.get('interval', '1min')
#     data = get_stock_data(symbol, interval)
#     return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
