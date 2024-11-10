import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ArticleCard from './ArticleCard';

import axios from 'axios';

import './FrontPage.css';

export default function FrontPage() {
    const [articles, setArticles] = useState([]);

    const searchForArticles = async (searchTerm: string) => {
        const query = {
            keywords: searchTerm
        }
        const queryString = new URLSearchParams(query).toString();

        const response = await fetch(`http://127.0.0.1:5000/search?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        
        // axios.get(result[0].url).then(function (r) {

            
        // });

        setArticles(result);
    }

    return (
        <div id="front-page">
            <h1>Front Page</h1>
            <SearchBar searchForArticles={searchForArticles} />
            {articles.map((article: any, index: number) => {
                return (
                    <ArticleCard
                        key={index}
                        author={article.author}
                        title={article.title}
                        url={article.url}
                        description={article.description}
                        content={article.content}
                        date={article.publishedAt}
                    />
                );
            }
            )}
        </div>
    );
}