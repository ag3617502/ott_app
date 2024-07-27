import React from 'react';

const ContentCard = ({ name, posterImage }) => {
  return (
    <div className="content-card">
      <img src={`https://test.create.diagnal.com/images/${posterImage==='posterthatismissing.jpg'?'placeholder_for_missing_posters.png':posterImage}`} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default ContentCard;
