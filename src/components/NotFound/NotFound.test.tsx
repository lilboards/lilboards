import { screen } from '@testing-library/react';

import { renderWithContext } from '../../utils/test';
import NotFound from './NotFound';

it('renders not found', () => {
  renderWithContext(<NotFound />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Not Found',
    })
  ).toBeInTheDocument();
});

it('renders home link', () => {
  renderWithContext(<NotFound />);
  expect(
    screen.getByRole('link', {
      name: 'home',
    })
  ).toHaveAttribute('href', '/');
});
