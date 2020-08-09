import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithRouterProvider } from '../../../test/testUtils';
import { userInitState } from '../../../modules/user/userSlice';
import { sidebarInitState } from '../../../modules/sidebar/sidebarSlice';
import ROOT_ROUTES from '../../rootRoutes';
import { RootState } from '../../../modules/store';
import { proxyInitState } from '../../../modules/proxy/proxySlice';
import { clusterInitState } from '../../../modules/cluster/clusterSlice';
import TokenState from '../../../modules/models/TokenState';
import { spawnerInitState } from '../../../modules/spawner/spawnerSlice';

import RenderRoutes from './RenderRoutes';

describe('<RenderRoutes />', () => {
  let state: Partial<RootState>;

  beforeEach(() => {
    state = {
      user: userInitState,
      sidebar: sidebarInitState,
      proxy: proxyInitState,
      cluster: clusterInitState,
      spawner: spawnerInitState,
    };
  });

  afterEach(cleanup);

  test('it should mount', () => {
    const screen = renderWithRouterProvider(
      <RenderRoutes
        routes={ROOT_ROUTES}
        tokenState={TokenState.VALID}
        isAuthenticated
      />,
      { state }
    );

    expect(screen.getByTestId('NavbarWrapper')).toBeInTheDocument();
  });
});
