const db = require('../config/connection');
const { Game, Platform, Play, User } = require('../models');

const gameData = require('./gameData.json');
const platformData = require('./platformData.json');
const playData = require('./playData.json');
const userData = require('./userData.json');
const userplayData = require('./userplayData.json')

db.once('open', async () => {
  await Game.deleteMany({});
  await Platform.deleteMany({});
  await Play.deleteMany({});
  await User.deleteMany({});

  const games = await Game.insertMany(gameData);
  const platforms = await Platform.insertMany(platformData);
  const users = await User.insertMany(userData);
  
  for (let i=0; i < playData.length; i++){
    gIndex = playData[i].game_id;
    pIndex = playData[i].platform_id;

    game_id = games[gIndex-1]._id;
    platform_id = platforms[pIndex-1]._id;
    team_search = playData[i].team_search;
    await Play.insertMany({game_id, platform_id, team_search});
  }

  const plays = await Play.find();

  for (let i=0; i < userData.length; i++){

    for (let j=0; j < userplayData[i].playplatform.length; j++){
      pIndex = userplayData[i].playplatform[j].platform_id;
      gIndex = userplayData[i].playgame[j];
      console.log(pIndex);
      console.log(gIndex);
      friend_code = userplayData[i].playplatform[j].friend_code;
      platform_id = platforms[pIndex-1]._id;
      play_id = plays[gIndex-1]._id;
      user_id = users[i]._id;
      const userp = await User.findOneAndUpdate(
        { _id: user_id },
        {
          $addToSet: {
            playplatform: {platform_id, friend_code},
            
          },
        }

      );
      const userg = await User.findOneAndUpdate(
        { _id: user_id },
        {
          $addToSet: {
            playgame: {play_id},
          }
        },

      );

    }

  }

  console.log('Information seeded!');
  process.exit(0);
});
