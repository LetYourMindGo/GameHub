/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../slices/UserSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [played, setPlayed] = useState([]);
  const [wish, setWish] = useState([]);
  const [playing, setPlaying] = useState([]);

  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getGameData = async ids => {
    const urlDev = 'http://localhost:4123';
    const url = 'https://gamehub-gameserver.herokuapp.com';

    const gameData = await axios.post(`${urlDev}/api/profile-games`, {idArray: ids});
    return gameData.data;
  }

  const handleLoad = async () => {
    const urlDev = 'http://localhost:8123';
    const url = 'https://gamehub-userserver.herokuapp.com';

    const userGames = await axios.get(`${urlDev}/user/${user.userData.username}`);
    
    const playedGames = userGames.data.filter(game => game.status === 'played');
    const playedData = await getGameData(playedGames.map(game => game.gameid));
    setPlayed(playedData);
    const wishGames = userGames.data.filter(game => game.status === 'wish');
    const wishData = await getGameData(wishGames.map(game => game.gameid));
    setWish(wishData);
    const playingGames = userGames.data.filter(game => game.status === 'playing');
    const playingData = await getGameData(playingGames.map(game => game.gameid));
    setPlaying(playingData);
  };

  const handleLogout = e => {
    e.preventDefault();
    dispatch(
      setUser({
        user: {},
        accessToken: null,
      })
    );
    navigate('/');
  };

  const move = e => {
    e.preventDefault();
    navigate('/game/123');
  }

  const moveIt = e => {
    e.preventDefault();
    navigate('/game/467');
  }

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <div className="page-content__profile">
        <div className="profile__avatar">
        { user.userData.avatar ? 
              <img src={user.userData.avatar} alt={user.userData.username} className="profile__image" />
            :
              <FontAwesomeIcon icon={faUserCircle} className="profile__icon" /> } 
        </div>
        <div className="profile__info">
          <h2 className="info__username">{user.userData.username}</h2>
          <p className="info__details">Games played: 52</p>
          <p className="info__details">Reviews written: 75</p>
          { user.accessToken &&
          <button className="info__logout" onClick={handleLogout}>Logout</button>
          }
          <button onClick={move}>Magic button</button>

          <button onClick={moveIt}>Magic button for witcher</button>
        </div>
      </div>
      <div className="page-content__profile-games">
        { played.length > 0 &&
        <>
          <h2 className="profile-games__title">Games marked as played</h2>
          <div className="profile-games__played">
            {played.map(game => <><p>{game.gameid}</p><p>{game.status}</p></>)}
          </div>
        </> }
        { wish.length > 0 &&
        <>
          <h2 className="profile-games__title">Games marked as wish to play</h2>
          <div className="profile-games__wish">
            {wish.map(game => <><p>{game.gameid}</p><p>{game.status}</p></>)}
          </div>
        </> }
        { playing.length > 0 &&
        <>
          <h2 className="profile-games__title">Games marked as playing</h2>
          <div className="profile-games__playing">
            {playing.map(game => <><p>{game.gameid}</p><p>{game.status}</p></>)}
          </div>
        </> }
      </div>
    </>
  );
};

export default Profile;
