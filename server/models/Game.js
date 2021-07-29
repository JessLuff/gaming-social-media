const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const gameSchema = new Schema(
    {
        title: {
          type: String,
          required: true,
          unique: true,
        },

        // PLATFORM IDS?

      },
      // set this to use virtual below
      /*
      {
        toJSON: {
          virtuals: true,
        },
      } */
    );
    
   
    const Game = model('Game', gameSchema);
    
    module.exports = Game;
    