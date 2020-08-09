import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithRouterProvider } from '../../../test/testUtils';
import { userInitState } from '../../../modules/user/userSlice';
import { sidebarInitState } from '../../../modules/sidebar/sidebarSlice';
import { RootState } from '../../../modules/store';
import TokenState from '../../../modules/models/TokenState';

import ProtectedRoute from './ProtectedRoute';

describe('<ProtectedRoute />', () => {
  let state: Partial<RootState>;

  beforeEach(() => {
    state = {
      user: userInitState,
      sidebar: sidebarInitState,
    };
  });

  afterEach(cleanup);

  test('it should redirect to the login page when not authenticated', () => {
    const screen = renderWithRouterProvider(
      <ProtectedRoute
        path="/"
        exact
        component={() => <div>TEST</div>}
        name="Dashboard"
        key="Dashboard"
        isAuthenticated={false}
      />,
      { state }
    );

    expect(screen.history.location.pathname).toBe('/login');
  });

  test('it should redirect to the page when authenticated', () => {
    const screen = renderWithRouterProvider(
      <ProtectedRoute
        path="/"
        exact
        component={() => <div>TEST</div>}
        name="Dashboard"
        key="Dashboard"
        isAuthenticated
      />,
      { state }
    );

    expect(screen.history.location.pathname).toBe('/');
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('it should hide the navbar when hideNavbar is set to true', () => {
    const screen = renderWithRouterProvider(
      <ProtectedRoute
        path="/"
        exact
        component={() => <div>TEST</div>}
        name="Dashboard"
        key="Dashboard"
        isAuthenticated
        hideNavbar
      />,
      { state }
    );

    expect(screen.queryByText('ANALYTICS')).not.toBeInTheDocument();
  });

  test('it should redirect to the root route when user is authenticated and the page should hideOnAuth', () => {
    const screen = renderWithRouterProvider(
      <ProtectedRoute
        path="/test"
        exact
        component={() => <div>TEST</div>}
        name="Dashboard"
        key="Dashboard"
        isAuthenticated
        hideOnAuth
      />,
      { state }
    );

    expect(screen.history.location.pathname).toBe('/');
  });

  test('it should logout when token is expired', () => {
    const screen = renderWithRouterProvider(
      <ProtectedRoute
        path="/test"
        exact
        component={() => <div>TEST</div>}
        name="Dashboard"
        key="Dashboard"
        isAuthenticated
        tokenState={TokenState.EXPIRED}
      />,
      { state }
    );

    expect(screen.store.getActions()).toEqual([
      { payload: undefined, type: 'user/logout' },
    ]);
  });

  test('it should show the SessionExtendModal when token is nearing expiration', () => {
    const screen = renderWithRouterProvider(
      <ProtectedRoute
        path="/"
        exact
        component={() => <div>TEST</div>}
        name="Dashboard"
        key="Dashboard"
        isAuthenticated
        tokenState={TokenState.WARNING}
      />,
      { state }
    );

    expect(screen.getByTestId('SessionExtendModal')).toBeInTheDocument();
  });
});
