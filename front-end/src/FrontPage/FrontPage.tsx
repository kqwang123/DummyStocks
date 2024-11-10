import { useState } from 'react';
import SearchBar from './SearchBar';
import ArticleCard from './ArticleCard';

import './FrontPage.css';

export default function FrontPage() {
    const [articles, setArticles] = useState([]);

    const searchForArticles = async (searchTerm: string) => {
        const query = {
            keywords: searchTerm
        }
        const queryString = new URLSearchParams(query).toString();

        const response = await fetch(`https://dummystocks.onrender.com/search?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        try {
            for (let i = 0; i < result.length; i++) {
                const urlLink = result[i].url;
                const res = await fetch(`https://dummystocks.onrender.com/scrape?url=${urlLink}`, {
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
        console.log(result);
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