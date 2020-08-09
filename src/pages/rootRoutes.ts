import Landing from './Landing/Landing';
import Signup from './Signup/Signup';
import Chat from './Chat/Chat';
import { RouteObject } from './RouteObject';

const ROOT_ROUTES: RouteObject[] = [
  {
    path: '/',
    name: 'Landing Page',
    exact: true,
    hideOnAuth: true,
    component: Landing,
    isPublic: true,
  },
  {
    path: '/signup',
    name: 'Signup',
    hideOnAuth: true,
    component: Signup,
    isPublic: true,
  },
  {
    path: '/chat',
    name: 'Chat Page',
    component: Chat,
  },
];

export default ROOT_ROUTES;
