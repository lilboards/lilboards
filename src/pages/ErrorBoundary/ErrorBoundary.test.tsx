import { screen } from '@testing-library/react';
import { useRouteError } from 'react-router-dom';

import { renderWithContext } from '../../utils/test';
import ErrorBoundary from './ErrorBoundary';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteError: jest.fn(),
}));

const mockedUseRouteError = jest.mocked(useRouteError);

jest.spyOn(console, 'error');

afterAll(() => {
  jest.resetAllMocks();
});

it('renders heading', () => {
  renderWithContext(<ErrorBoundary />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Error',
    })
  ).toBeInTheDocument();
});

it('renders error message', () => {
  const error = new Error('test');
  mockedUseRouteError.mockReturnValueOnce(error);
  renderWithContext(<ErrorBoundary />);
  expect(screen.getByText(error.toString())).toBeInTheDocument();
  // eslint-disable-next-line no-console
  expect(console.error).toBeCalledWith(error);
});

it('renders home link', () => {
  renderWithContext(<ErrorBoundary />);
  expect(
    screen.getByRole('link', {
      name: 'home',
    })
  ).toHaveAttribute('href', '/');
});