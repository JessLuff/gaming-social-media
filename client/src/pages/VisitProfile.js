import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getUser } from '../utils/API';
import Auth from '../utils/auth';

const Profile = () => {
  //const { username: userParam } = useParams();
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
        const response = await getUser(token, this.params);
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();

  }, [userDataLength]);

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>{userData.username}'s Profile</h1>
        </Container>
      </Jumbotron>
      <Container>
        
        <p>{userData.firstname} {userData.lastname}</p>
        
        <CardColumns>
          {userData.playplatform.map((platform) => {
            return (
              <Card key={platform.platformname} border='dark'>
                <Card.Body>
                  <Card.Title>{platform.platform_id.platformname}</Card.Title>
                  <Card.Text>{platform.friend_code}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Profile;
