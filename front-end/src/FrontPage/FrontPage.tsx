import { useState } from 'react';
import SearchBar from './SearchBar';
import ArticleCard from './ArticleCard';

import './FrontPage.css';

// const api_url = "http://127.0.0.1:5000/";
const api_url = "https://dummystocks.onrender.com/";

export default function FrontPage() {
    const [articles, setArticles] = useState([]);

    const searchForArticles = async (searchTerm: string) => {
        const query = {
            keywords: searchTerm
        }
        const queryString = new URLSearchParams(query).toString();

        const response = await fetch(`${api_url}search?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        try {
            for (let i = 0; i < result.length; i++) {
                const urlLink = result[i].url;
                const res = await fetch(`${api_url}scrape?url=${urlLink}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const resText = await res.text();
                result[i].content = resText;
            }

        } catch (error) {
            console.error(error);
        }
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