import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContent, incrementPage } from '../features/content/contentSlice';
import ContentCard from './ContentCard';
import Loader from './Loader';

const ContentGrid = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { content, page, loading, hasMore } = useSelector((state) => state.content);

  useEffect(() => {
    if (hasMore  ) {
      dispatch(fetchContent(page));
    }
  }, [page, dispatch, hasMore]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    if(page<3)dispatch(incrementPage());
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const filteredContent = content.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-grid">
      {filteredContent.map((item, index) => (
        <ContentCard key={index} name={item.name} posterImage={item['poster-image']} />
      ))}
      {loading && <Loader />}
    </div>
  );
};

export default ContentGrid;
