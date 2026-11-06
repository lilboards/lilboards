import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/utils';
import { expect, it } from 'vitest';

import NotFound from './NotFound';

it('renders not found', () => {
  renderWithProviders(<NotFound />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Not Found',
    }),
  ).toBeVisible();
});

it('renders home link', () => {
  renderWithProviders(<NotFound />);
  expect(
    screen.getByRole('link', {
      name: 'home',
    }),
  ).toHaveAttribute('href', '/');
});
