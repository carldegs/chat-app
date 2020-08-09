import { useEffect, useState, useCallback } from 'react';

import { useFirebase } from '../components/Firebase/context';

import useCurrUser from './useCurrUser';

interface IUseChat {
  chat: IChat[];
  sendMessage: (content?: string) => void;
}

interface IChat {
  content: string;
  timestamp: number;
  uid: string;
}

const useChat = (): IUseChat => {
  const [chat, setChat] = useState<IChat[]>([]);
  const firebase = useFirebase();
  const currUser = useCurrUser();

  const sendMessage = useCallback(
    async (content?: string) => {
      if (!content || !currUser) {
        return;
      }

      await firebase.db.ref('chats').push({
        content,
        timestamp: Date.now(),
        uid: currUser?.uid,
      });
    },
    [firebase, currUser]
  );

  useEffect(() => {
    firebase.db.ref('chats').on('value', snapshot => {
      let newChat: IChat[] = [];

      snapshot.forEach(snap => {
        newChat = [...newChat, snap.val()];
      });

      setChat(newChat.filter(c => !!c));
    });
  }, [firebase]);

  return { chat, sendMessage };
};

export default useChat;
