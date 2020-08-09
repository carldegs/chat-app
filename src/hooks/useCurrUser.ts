import { useState, useEffect } from 'react';

import { useFirebase } from '../components/Firebase/context';

const useCurrUser = (): firebase.User | null => {
  const firebase = useFirebase();
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    setUser(firebase.auth.currentUser);
  }, [firebase.auth.currentUser]);

  return user;
};

export default useCurrUser;