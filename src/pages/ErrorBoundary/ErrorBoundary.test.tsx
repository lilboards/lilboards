import { screen } from '@testing-library/react';
import { useRouteError } from 'react-router-dom';
import { renderWithProviders } from 'test/utils';
import { afterAll, expect, it, vi } from 'vitest';

import ErrorBoundary from './ErrorBoundary';

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-router-dom')>()),
  useRouteError: vi.fn(),
}));

const mockedUseRouteError = vi.mocked(useRouteError);

vi.spyOn(console, 'error').mockImplementation(vi.fn());

afterAll(() => {
  vi.restoreAllMocks();
});

it('renders heading', () => {
  renderWithProviders(<ErrorBoundary />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Error',
    }),
  ).toBeInTheDocument();
});

it('renders error message', () => {
  const error = new Error('test');
  mockedUseRouteError.mockReturnValueOnce(error);
  renderWithProviders(<ErrorBoundary />);
  expect(screen.getByText(error.toString())).toBeInTheDocument();
  // eslint-disable-next-line no-console
  expect(console.error).toHaveBeenCalledWith(error);
});

it('renders home link', () => {
  renderWithProviders(<ErrorBoundary />);
  expect(
    screen.getByRole('link', {
      name: 'home',
    }),
  ).toHaveAttribute('href', '/');
});
