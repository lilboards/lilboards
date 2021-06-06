import { screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test';
import Layout from './Layout';

it('renders children', () => {
  const children = 'children';
  renderWithStore(<Layout>{children}</Layout>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
