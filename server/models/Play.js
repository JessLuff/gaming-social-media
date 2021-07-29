    const { Schema, model } = require('mongoose');
    const bcrypt = require('bcrypt');
    
    const playSchema = new Schema(
        {
            unitname: {
              type: String,
              required: true,
              unique: true,
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
        