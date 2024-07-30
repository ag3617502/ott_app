import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, suggestions }) => {
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    setHighlightIndex(-1);
  }, [suggestions]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === 'Enter') {
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        setSearchTerm(suggestions[highlightIndex].name);
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <div onClick={()=>setSearchTerm('')}>
        <img
          src="https://test.create.diagnal.com/images/Back.png"
          alt="Back"
          className="back-button"
        /></div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="search-bar"
        />
        <img
          src="https://test.create.diagnal.com/images/search.png"
          alt="Search"
          className="search-button"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={highlightIndex === index ? 'highlight' : ''}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

};

export default SearchBar;
