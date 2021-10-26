import { render, screen } from '@testing-library/react';

import NotFound from './NotFound';

it('renders not found', () => {
  render(<NotFound />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Not Found',
    })
  ).toBeInTheDocument();
});

it('renders home link', () => {
  render(<NotFound />);
  expect(
    screen.getByRole('link', {
      name: 'home',
    })
  ).toHaveAttribute('href', '/');
});
