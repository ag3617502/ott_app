import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchContent } from '../redux/actions/contentActions';
import { fetchContent, incrementPage } from '../features/content/contentSlice';
import ContentCard from './ContentCard';

const ContentGrid = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { content, loading } = useSelector((state) => state.content);
  const loader = useRef(null);
  const [page, setPage] = useState(1);
  const [allPagesLoaded, setAllPagesLoaded] = useState(false);

  useEffect(() => {
    if (page <= 3 && !allPagesLoaded) {
      dispatch(fetchContent(page));
    } else {
      setAllPagesLoaded(true);
    }
  }, [dispatch, page, allPagesLoaded]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && !allPagesLoaded) {
      setPage((prev) => prev + 1);
    }
  }, [loading, allPagesLoaded]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2 && !loading && !allPagesLoaded) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, allPagesLoaded]);

  const filteredContent = content.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-grid">
      {filteredContent.map((item, index) => (
       <ContentCard key={index} name={item.name} posterImage={item['poster-image']} />
      ))}
      {loading && <div className="loader">Loading...</div>}
      <div ref={loader} />
    </div>
  );
};

export default ContentGrid;
