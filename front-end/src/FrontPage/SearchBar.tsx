import React, { useState } from 'react';

// Define the type for the props
interface SearchBarProps {
    placeholder: string;
    searchFunction: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, searchFunction }) => {
    const [search, setSearch] = useState<string>('');

    const handleSearch = async () => {
        await searchFunction(search);        
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
                placeholder={placeholder}
            />
            <button id="search-bar-button" onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
