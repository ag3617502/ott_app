import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ContentGrid from '../components/ContentGrid';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { content } = useSelector((state) => state.content);

  useEffect(() => {
    // this logic is required for removing the multiple same items from search 
    if (searchTerm) {
      const filteredSuggestions = content.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const uniqueSuggestions = Array.from(new Set(filteredSuggestions.map(item => item.name)))
        .map(name => {
          return filteredSuggestions.find(item => item.name === name);
        });

      setSuggestions(uniqueSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, content]);

  return (
    <div className="home-page">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} suggestions={suggestions} />
      <ContentGrid searchTerm={searchTerm} />
    </div>
  );
};

export default HomePage;
