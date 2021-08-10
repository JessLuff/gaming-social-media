import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', firstname: '', lastname:'', dob: '', platform_id: '', platform_friend_code: '', game_id: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createUser(userFormData);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      dob: '',
      platform_id: '',
      platform_friend_code: '',
      game_id: ''
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='firstname'>First Name</Form.Label>
          <Form.Control
            type='firstname'
            placeholder='Your first name'
            name='firstname'
            onChange={handleInputChange}
            value={userFormData.firstname}
            required
          />
          <Form.Control.Feedback type='invalid'>First name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='lastname'>Last Name</Form.Label>
          <Form.Control
            type='lastname'
            placeholder='Your last name'
            name='lastname'
            onChange={handleInputChange}
            value={userFormData.lastname}
            required
          />
          <Form.Control.Feedback type='invalid'>Last name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='dob'>Date of Birth (YYYY-MM-DD)</Form.Label>
          <Form.Control
            type='dob'
            placeholder='Your DOB'
            name='dob'
            onChange={handleInputChange}
            value={userFormData.dob}
            required
          />
          <Form.Control.Feedback type='invalid'>Date of Birth is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='platform_id'>Platform</Form.Label>
          <Form.Control
            type='platform_id'
            placeholder='Platform'
            name='platform_id'
            onChange={handleInputChange}
            value={userFormData.platform_id}
            required
          />
          <Form.Control.Feedback type='invalid'>At least one gaming platform is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='platform_friend_code'>Friend Code</Form.Label>
          <Form.Control
            type='platform_friend_code'
            placeholder='Your Friend Code for this Platform'
            name='platform_friend_code'
            onChange={handleInputChange}
            value={userFormData.platform_friend_code}
            required
          />
          <Form.Control.Feedback type='invalid'>Your platform friend code is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='game_id'>Game</Form.Label>
          <Form.Control
            type='game_id'
            placeholder='A game you play'
            name='game_id'
            onChange={handleInputChange}
            value={userFormData.game_id}
            required
          />
          <Form.Control.Feedback type='invalid'>A game is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password && userFormData.firstname && userFormData.lastname && userFormData.dob && userFormData.platform_id && userFormData.platform_friend_code && userFormData.game_id)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
