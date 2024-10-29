import { screen } from '@testing-library/react';
import { renderWithProviders, updateStore } from 'test/utils';

import Header from './Header';

it('renders header', () => {
  renderWithProviders(<Header />);
  expect(screen.getByRole('banner')).toHaveTextContent('Lilboards');
});

it('renders heading link', () => {
  renderWithProviders(<Header />);
  expect(screen.getByRole('link', { name: 'Lilboards' })).toHaveAttribute(
    'href',
    '/',
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
    'https://b.remarkabl.org/lilboards',
  );
});

describe('when not logged in', () => {
  it('renders login link', () => {
    updateStore.withUser(false);
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute(
      'href',
      '/login',
    );
  });

  it.each(['Boards', 'Lists'])('does not render %s link', (name) => {
    updateStore.withUser(false);
    renderWithProviders(<Header />);
    expect(screen.queryByRole('link', { name })).not.toBeInTheDocument();
  });
});

describe('when logged in', () => {
  it('renders logout link', () => {
    updateStore.withUser();
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Logout' })).toHaveAttribute(
      'href',
      '/logout',
    );
  });

  it('renders Boards link', () => {
    updateStore.withUser();
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Boards' })).toHaveAttribute(
      'href',
      '/boards',
    );
  });

  it('renders Lists link', () => {
    updateStore.withUser();
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Lists' })).toHaveAttribute(
      'href',
      '/lists',
    );
  });
});
