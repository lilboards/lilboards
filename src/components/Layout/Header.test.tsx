import { screen } from '@testing-library/react';

import { renderWithContext, updateStore } from '../../utils/test';
import Header from './Header';

it('renders header', () => {
  renderWithContext(<Header />);
  expect(screen.getByRole('banner')).toHaveTextContent('Lilboards');
});

it('renders heading link', () => {
  renderWithContext(<Header />);
  expect(screen.getByRole('link', { name: 'Lilboards' })).toHaveAttribute(
    'href',
    '/'
  );
});

it('renders GitHub link', () => {
  renderWithContext(<Header />);
  expect(screen.getByLabelText('Open GitHub repository')).toHaveAttribute(
    'href',
    'https://b.remarkabl.org/lilboards'
  );
});

describe('when not logged in', () => {
  it('renders login link', () => {
    updateStore.withUser(false);
    renderWithContext(<Header />);
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute(
      'href',
      '/login'
    );
  });

  it('does not render boards link', () => {
    updateStore.withUser(false);
    renderWithContext(<Header />);
    expect(
      screen.queryByRole('link', { name: 'Boards' })
    ).not.toBeInTheDocument();
  });
});

describe('when logged in', () => {
  it('renders logout link', () => {
    updateStore.withUser();
    renderWithContext(<Header />);
    expect(screen.getByRole('link', { name: 'Logout' })).toHaveAttribute(
      'href',
      '/logout'
    );
  });

  it('renders boards link', () => {
    updateStore.withUser();
    renderWithContext(<Header />);
    expect(screen.getByRole('link', { name: 'Boards' })).toHaveAttribute(
      'href',
      '/boards'
    );
  });
});
