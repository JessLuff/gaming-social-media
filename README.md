# gaming-social-media

USER DATABASE (email, password, first and last name, DOB, region (?? how to do ??))
GAMES DATABASE (name, platform_ids(??)) [OR LINKING DATABSE]
PLATFORM DATABASE (name)
GAME -> USER DATABASE (user_id, game_id, platform_id)
FRIENDS DATABASE (min user_id, max user_id


For game data platforms it belongs to, put in model?

comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],