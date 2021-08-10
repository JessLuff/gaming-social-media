import React, { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getUsers } from '../utils/API';
import Auth from '../utils/auth';

const Dashboard = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return false;
        }
        const response = await getUsers(token);
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
        const user = await response.json();
        console.log(user);
        setUserData(user);
        
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();

  }, [userDataLength]);


  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2 class="text-center">Sign in to begin searching for teammates!</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1 class="text-center">Gamers looking for teammates!</h1>
        </Container>
      </Jumbotron>
      <Container>
        
        
        <p></p>
        
        <CardColumns>
          {userData.map((user) => {
            return (
              <Card key={user.username} border='dark'>
                <Card.Body>
                  <Card.Title><Link to={'/VisitProfile/${user.id}'} params = {user}>{user.username}</Link></Card.Title>

                  <Card.Text></Card.Text>

                  {user.playgame.map((playgame) => {
                    return(
                      <li className="game-list" key ={playgame.game_id}>
                        {playgame.game_id}


                      </li>
                    );
                  })}
                  <h5>Add Me On:</h5>
                  {user.playplatform.map((playplatform) => {
                    return(
                      <p className="platform-list" key ={playplatform.platform_id}>
                        {playplatform.platform_id}: {playplatform.friend_code}


                      </p>
                    );
                  })}

                  
                  
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>


      </Container>
    </>
  );
};

export default Dashboard;
