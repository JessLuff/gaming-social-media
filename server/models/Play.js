    const { Schema, model } = require('mongoose');
    const bcrypt = require('bcrypt');
    
    const playSchema = new Schema(
        {
            game_id: {
              type: Schema.Types.ObjectId,
              ref: 'Game',
            },
            platform_id: {
              type: Schema.Types.ObjectId,
              ref: 'Platform',
            },
            team_search: {
              type: Boolean,
              required: true,
            },
            // PLATFORM ID CHECKS?????
    
    
          },
          // set this to use virtual below
          /*
          {
            toJSON: {
              virtuals: true,
            },
          } */
        );
        
       
        const Play = model('Play', playSchema);
        
        module.exports = Play;
        