import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ArticleCard from './ArticleCard';
import StockGraph from './StockGraph';

import './FrontPage.css';

const api_url = "http://127.0.0.1:5000/";
// const api_url = "https://dummystocks.onrender.com/";

type Stock = {
    x: number;
    symbol: string;
    y: number;
};

export default function FrontPage() {
    const [articles, setArticles] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [displayStocks, setDisplayStocks] = useState<Stock[]>([]);

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

    const getStocks = async () => {
        const response = await fetch(`${api_url}stocks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        let earnings = result.earningsCalendar.filter((stock: any) => stock.revenueActual !== null && stock.revenueActual !== 0);
        setStocks(earnings);

        const displayed = earnings
            .sort(() => Math.random() - 0.5)
            .slice(0, 20)
                .map((stock: any, index: number) => ({
                    x: index + 1,
                    symbol: stock.symbol,
                    y: stock.revenueActual,
                }));

        setDisplayStocks(displayed);
    }

    const searchStock = async (searchTerm: string) => {
        const query = {
            keywords: searchTerm
        }
        const queryString = new URLSearchParams(query).toString();

        const response = await fetch(`${api_url}get_stock?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        const filteredResult = result.result.filter((item: any) => item.type === "Common Stock");

        if (filteredResult.length === 0) {
            alert("No stock found");
        }
        else {
            const stockResponse =  await fetch(`${api_url}get_stock_data?symbol=${filteredResult[0].symbol}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const stockData = await stockResponse.json();
            if (stockData.length === 0) {
                alert("No stock data found");
            }
            else {

                const newStock: Stock = {
                    x: 1,
                    symbol: stockData.earningsCalendar[0].symbol,
                    y: stockData.earningsCalendar[0].revenueActual,
                };

                // Create a new array where the first element is newStock, and the rest remains the same
                let newStocks = [newStock, ...displayStocks.slice(1)];
                console.log(newStocks);

                // Update the state with the new array
                setDisplayStocks(newStocks);
            }
        }
    }

    useEffect(() => {
        getStocks();
    }, []);

    return (
        <div id="front-page">
            <h1>Dummy Stocks</h1>
            <div id="content">
                <div id="articles">
                    <SearchBar searchFunction={searchForArticles} placeholder='' />
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
                <div id="stocks">
                    <h2>Stocks</h2>
                    <SearchBar searchFunction={searchStock} placeholder='Stock symbols here' />
                    <StockGraph data={displayStocks} />
                </div>
            </div>
        </div>
    );
}