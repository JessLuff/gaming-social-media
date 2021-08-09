import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
//import { saveBook, searchGoogleBooks } from '../utils/API';
import { addTeam, searchTeam } from '../utils/API';
//import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { saveTeamIds, getSavedTeamIds } from '../utils/localStorage';

const SearchTeam = () => {
  // create state for holding returned google api data
  const [searchedTeam, setSearchedTeam] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  const [savedTeamIds, setSavedTeamIds] = useState(getSavedTeamIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveTeamIds(savedTeamIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await setSearchedTeam(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const teamData = items.map((user) => ({
        
        teamId: user.id,
        username: user.username,
        //platform: user.platform, //this needs fixing 
        //friendcode: user.friend_code, //this needs fixing
        
      }));

      setSearchedTeam(teamData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveTeam = async (teamId) => {
    // find the book in `searchedBooks` state by the matching id
    const teamToSave = searchedTeam.find((user) => user.id === teamId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveTeam(teamToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedTeamIds([...savedTeamIds, teamToSave.teamId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Teammates!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a teammate'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

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
    </>
  );
};

export default SearchTeammates;
