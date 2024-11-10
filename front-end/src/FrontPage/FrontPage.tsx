import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ArticleCard from './ArticleCard';
import StockGraph from './StockGraph';

import './FrontPage.css';

const api_url = "http://127.0.0.1:5000/";
// const api_url = "https://dummystocks.onrender.com/";

export default function FrontPage() {
    const [articles, setArticles] = useState([]);
    const [stocks, setStocks] = useState([]);

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

        // const data = (await response.json());
        // const result = data.slice(0, Math.min(10, data.length));
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

    const searchStocks = async () => {
        const response = await fetch(`${api_url}stocks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        let earnings = result.earningsCalendar.filter((stock: any) => stock.revenueActual !== null && stock.revenueActual !== 0);

        earnings = earnings
            .map((stock: any, index: number) => ({
                x: index + 1,
                symbol: stock.symbol,
                y: stock.revenueActual,
            }))
            .sort(() => Math.random() - 0.5)
            .slice(0, 20);

        setStocks(earnings);
    }

    useEffect(() => {
        searchStocks();
    }, []);

    return (
        <div id="front-page">
            <h1>Front Page</h1>
            <div id="content">
                <div id="articles">
                    <SearchBar searchForArticles={searchForArticles} />
                    {articles.map((article: any, index: number) => {
                        return (
                            <ArticleCard
                                // key={index}
                                // title={article.headline}
                                // url={article.url}
                                // description={article.summary}
                                // content={article.content}
                                // date={article.datetime}
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
                <div id="stocks">
                    <StockGraph data={stocks} />
                </div>
            </div>
        </div>
    );
}