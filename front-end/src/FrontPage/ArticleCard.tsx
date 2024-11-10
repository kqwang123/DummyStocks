import React from 'react';

import './ArticleCard.css';

// Define types for the props
interface ArticleCardProps {
    title: string;
    url: string;
    content: string;
    date: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({  title, url, content, date }) => {
    return (
        <div id="article-card">
            <h2>{title}</h2>
            <p>{content}</p>
            <a href={url}>{url}</a>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
        </div>
    );
}

export default ArticleCard;