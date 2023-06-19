import { screen } from '@testing-library/react';

import { renderWithProviders, updateStore } from '../../utils/test';
import Header from './Header';

it('renders header', () => {
  renderWithProviders(<Header />);
  expect(screen.getByRole('banner')).toHaveTextContent('Lilboards');
});

it('renders heading link', () => {
  renderWithProviders(<Header />);
  expect(screen.getByRole('link', { name: 'Lilboards' })).toHaveAttribute(
    'href',
    '/'
  );
});

it('renders support link', () => {
  renderWithProviders(<Header />);
  expect(screen.getByLabelText('Support')).toHaveAttribute('href', '/support');
});

it('renders GitHub link', () => {
  renderWithProviders(<Header />);
  expect(screen.getByLabelText('GitHub')).toHaveAttribute(
    'href',
    'https://github.com/lilboards/lilboards'
  );
});

describe('when not logged in', () => {
  it('renders login link', () => {
    updateStore.withUser(false);
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute(
      'href',
      '/login'
    );
  });

  it('does not render boards link', () => {
    updateStore.withUser(false);
    renderWithProviders(<Header />);
    expect(
      screen.queryByRole('link', { name: 'Boards' })
    ).not.toBeInTheDocument();
  });
});

describe('when logged in', () => {
  it('renders logout link', () => {
    updateStore.withUser();
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Logout' })).toHaveAttribute(
      'href',
      '/logout'
    );
  });

  it('renders boards link', () => {
    updateStore.withUser();
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Boards' })).toHaveAttribute(
      'href',
      '/boards'
    );
  });
});
