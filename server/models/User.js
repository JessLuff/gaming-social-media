const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

/*
// import schema from Book.js
const bookSchema = require('./Book');*/

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      //required: true,
    },
    lastname: {
      type: String,
      //required: true,
    },
    dob: {
      type: Date,
      //required: true
    },
    playplatform: [
      {
        platform_id: {
          type: String,
          required: true
        },
        friend_code: {
          type: String,
          required: true
        },
      },
    ],
    playgame: [
      {
        game_id: {
          type: String
        },
      },
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
