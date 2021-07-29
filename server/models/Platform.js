const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const platformSchema = new Schema(
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
    
   
    const Platform = model('Platform', platformSchema);
    
    module.exports = Platform;
    