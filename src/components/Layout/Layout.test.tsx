import { render, screen } from '@testing-library/react';
import Layout from './Layout';

it('renders children', () => {
  const children = 'children';
  render(<Layout>{children}</Layout>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
