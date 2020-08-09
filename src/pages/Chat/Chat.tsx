import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';

import { useFirebase } from '../../components/Firebase/context';

import useChat from '../../hooks/useChat';

import useCurrUser from '../../hooks/useCurrUser';

import styles from './Chat.module.scss';

const Chat: React.FC = () => {
  const firebase = useFirebase();
  const { chat, sendMessage } = useChat();
  const currUser = useCurrUser();
  const [message, setMessage] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: any) => {
    (e as Event).preventDefault();
    await sendMessage(message);
    setMessage(undefined);
  };

  return (
    <div className={styles.Chat} data-testid="Chat">
      Chat
      <Button onClick={() => firebase.logoutUser()}> Logout </Button>
      <div>
        {chat.map(msg => (
          <p key={msg.timestamp}>{msg.content}</p>
        ))}
      </div>
      <div>
        Logged in as
        {currUser && ` ${currUser.email}`}
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="chatInput">
          <Form.Control
            value={message}
            placeholder="Send Message"
            onChange={e => setMessage(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Chat;
