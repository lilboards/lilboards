import { screen } from '@testing-library/react';

import { renderWithContext } from '../../utils/test';
import Layout from './Layout';

it('renders children', () => {
  const children = 'children';
  renderWithContext(<Layout>{children}</Layout>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
