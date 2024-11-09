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

    return (
        <div id="search-bar">
            <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
