from flask import Flask, render_template, request
import requests

app = Flask(__name__)

# Your News API key (replace with your actual API key)
API_KEY = '71d7039eaa7447e281f44fc298daf45b'

# News API endpoint
NEWS_API_URL = 'https://newsapi.org/v2/everything'

@app.route('/apple', methods=['GET'])
def home():
    # Get the keyword from the form
    keyword = 'apple'
    
    # Make a request to the News API with the specified keyword
    params = {
        'q': keyword,
        'apiKey': API_KEY,
        'pageSize': 10  # Limit results to 10 articles
    }
    response = requests.get(NEWS_API_URL, params=params)
    
    # Check if the response was successful
    if response.status_code == 200:
        articles = response.json()['articles']
    else:
        articles = []
        error_message = "Error fetching news articles"
    
    return articles
    
    return []


if __name__ == '__main__':
    app.run(debug=True)
