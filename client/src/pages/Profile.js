import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe } from '../utils/API';
import Auth from '../utils/auth';

const Profile = () => {
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
        const response = await getMe(token);
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
    return <h2 class="text-center">Please login or sign up to continue.</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>{userData.username}'s Profile</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h5>First name: {userData.firstname}</h5>
        <h5>Last name: {userData.lastname}</h5>
        <h5>Email: {userData.email}</h5>

        
        <CardColumns>
          {userData.playplatform.map((platform) => {
            return (
              <Card key={platform.platform_id} border='dark'>
                <Card.Body>
                  <Card.Title>{platform.platform_id}</Card.Title>
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
