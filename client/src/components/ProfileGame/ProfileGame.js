import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileGame.css';

const ProfileGame = ({ game }) => {
  const navigate = useNavigate();

  const handleClick = e => {
    e.preventDefault();
    navigate(`/game/${game.id}`);
  };

  return (
    <div className="games__main-container">
      <div className="main-container__left" onClick={handleClick}>
        <img className="left__image" src={game.background} />
      </div>
      <div className="main-container__right">
        <h3 className="right__title">{game.name}</h3>
        <p className="right__rate">Rate this game</p>
      </div>
    </div>
  );
};

export default ProfileGame;
