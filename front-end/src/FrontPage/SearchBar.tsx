import React, { useState } from 'react';

// Define the type for the props
interface SearchBarProps {
  searchForArticles: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchForArticles }) => {
    const [search, setSearch] = useState<string>('');

    const handleSearch = async () => {
        await searchForArticles(search);        
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div id="search-bar">
            <input 
                id="search-input"
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                onKeyDown={handleKeyDown}
                autoComplete="off"
            />
            <button id="search-bar-button" onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
