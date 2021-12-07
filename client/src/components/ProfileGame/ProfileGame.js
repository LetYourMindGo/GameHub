import React from 'react';
import './ProfileGame.css';

const ProfileGame = ({ game }) => {
  console.log(game);
  return (
    <div>
      <h3>{game.name}</h3>
    </div>
  );
};

export default ProfileGame;
