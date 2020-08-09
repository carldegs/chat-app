import React from 'react';

import './App.scss';
import { BrowserRouter } from 'react-router-dom';

import Router from './pages/Router';

const App: React.FC = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

export default App;
