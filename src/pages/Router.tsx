import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useFirebase } from '../components/Firebase/context';

import ROOT_ROUTES from './rootRoutes';
import RenderRoutes from './components/RenderRoutes/RenderRoutes';

const Router: React.FC = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const firebase = useFirebase();

  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      setAuthenticated(!!user);
    });
  }, [firebase]);

  return (
    <BrowserRouter>
      <RenderRoutes routes={ROOT_ROUTES} isAuthenticated={isAuthenticated} />
    </BrowserRouter>
  );
};

export default Router;
