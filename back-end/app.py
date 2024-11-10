from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

import pandas as pd
from bs4 import BeautifulSoup

import finnhub

from dotenv import load_dotenv
import os

from llmodel import LLMCall, LLMCallResponse

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
    
    # news = finnhub_client.company_news(keywords, _from="2024-10-01", to="2024-11-10")
    
    # Check if the response was successful
    # if news:
    #     articles = news
    if response.status_code == 200:
        response_json = response.json()
        articles = response_json['articles']
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
        
        chat_history= []
        article = soup.find('article')  

        if article:
            aicall = LLMCall(article.get_text(strip=True),chat_history)
            return aicall
        else:
            return "Article content not found."
    else:
        return f"Failed to retrieve URL: {response.status_code}"
    
@app.route('/stocks', methods=['GET'])
def stocks():
    result = finnhub_client.earnings_calendar(_from="", to="", symbol="")
    return jsonify(result)

@app.route('/get_stock', methods=['GET'])
def get_stock():
    keywords = request.args.get('keywords')
    result = finnhub_client.symbol_lookup(keywords)
    return result

@app.route('/get_stock_data', methods=['GET'])
def get_stock_data():
    symbol = request.args.get('symbol')
    try:
        result = finnhub_client.earnings_calendar(_from="", to="", symbol=symbol)
    except:
        result = []
    return result

if __name__ == '__main__':
    app.run(debug=False)
