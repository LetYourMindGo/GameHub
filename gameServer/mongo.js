import { MongoClient } from 'mongodb';
import { getGames, getHomeData, getGenres, getGameByGenre, getGameInfo } from './api.js';
import { config } from 'dotenv';

config();

const uri = `mongodb+srv://mobsters:${process.env.MONGO_PASS}@cluster0.3c4ob.mongodb.net/Cluster0?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const createGame = async game => {
  await client.connect();
  await client.db("GameHub").collection("games").insertOne(game);
  await client.close();
};

export const getOneGame = async (req, res) => {
  try {
    const { id } = req.params;
    await client.connect();
    let game = await client.db("GameHub").collection("games").findOne({ id });
    console.log(game);
    await client.close();
    if (!game) {
      game = "No game found on db";
      // game = getGameInfo(id);
      // await createGame(game);
    }
    res.status(200).send(game);
  } catch (err) {
    console.log(err);
  } 
};


// async function createListing(client, newListing){
//   const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
//   console.log(`New listing created with the following id: ${result.insertedId}`);
// }

// await createListing(client,
//   {
//       name: "Lovely Loft",
//       summary: "A charming loft in Paris",
//       bedrooms: 1,
//       bathrooms: 1
//   }
// );

