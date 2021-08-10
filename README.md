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



  <Container>
        <h2>
          {searchedTeam.length
            ? `Viewing ${searchedTeam.length} results:`
            : 'Search for a team to begin'}
        </h2>
        <CardColumns>
          {searchedTeam.map((user) => {
            return (
              <Card key={user.teamId} border='dark'>
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  //<p className='small'>Platform: {user.platform}</p>
                  //<Card.Text>{user.friend_code}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedTeamIds?.some((savedTeamId) => savedTeamId === user.teamId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveTeam(user.teamId)}>
                      {savedTeamIds?.some((savedTeamId) => savedTeamId === user.teamId)
                        ? 'This teammate has already been saved!'
                        : 'Save this Teammate!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>