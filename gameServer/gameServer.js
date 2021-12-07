import express from 'express';
import { getGames, getHomeData, getGenres, getGameByGenre, getGameInfo } from './api.js';
import { getOneGame } from './mongo.js';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/api/games/:searchQuery', getGames);
app.get('/api/home', getHomeData);
app.get('/api/genres', getGenres);
app.get('/api/genre/:id', getGameByGenre);
app.get('/api/game/:id', getOneGame);

app.listen(process.env.PORT || 4123, () => console.log('App is running on port 4123'));
