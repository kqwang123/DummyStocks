import React from 'react';

// Define types for the props
interface ArticleCardProps {
    author: string;
    title: string;
    url: string;
    description: string;
    content: string;
    date: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ author, title, url, description, content, date }) => {
    return (
        <div id="article-card">
            <h2>Title: {title}</h2>
            <p>Author: {author}</p>
            <p>Description: {description}</p>
            <p>Content: {content}</p>
            <p>URL: {url}</p>
            <p>Date: {date}</p>
        </div>
    );
}

export default ArticleCard;