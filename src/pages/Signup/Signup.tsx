import React, { useState } from 'react';

import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useFirebase } from '../../components/Firebase/context';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const firebase = useFirebase();

  const handleSubmit = (e: any) => {
    (e as Event).preventDefault();

    if (!email || !password) {
      return;
    }

    firebase.signupUser(email, password);
  };

  return (
    <Container>
      <h1>Signup</h1>
      <Form noValidate>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" onClick={handleSubmit}>
          Login
        </Button>
        <br />
        <Link to="/">Already have an account? Login.</Link>
      </Form>
    </Container>
  );
};

export default Signup;
