import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/utils';

import NotFound from './NotFound';

it('renders not found', () => {
  renderWithProviders(<NotFound />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Not Found',
    }),
  ).toBeInTheDocument();
});

it('renders home link', () => {
  renderWithProviders(<NotFound />);
  expect(
    screen.getByRole('link', {
      name: 'home',
    }),
  ).toHaveAttribute('href', '/');
});
