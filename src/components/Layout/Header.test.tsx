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
  it('renders login button link', () => {
    updateStore.withUser(false);
    renderWithContext(<Header />);
    expect(screen.getByRole('button', { name: 'Login' })).toHaveAttribute(
      'href',
      '/login'
    );
  });

  it('does not render boards button link', () => {
    updateStore.withUser(false);
    renderWithContext(<Header />);
    expect(
      screen.queryByRole('button', { name: 'Boards' })
    ).not.toBeInTheDocument();
  });
});

describe('when logged in', () => {
  it('renders logout button link', () => {
    updateStore.withUser();
    renderWithContext(<Header />);
    expect(screen.getByRole('button', { name: 'Logout' })).toHaveAttribute(
      'href',
      '/logout'
    );
  });

  it('renders boards button link', () => {
    updateStore.withUser();
    renderWithContext(<Header />);
    expect(screen.getByRole('button', { name: 'Boards' })).toHaveAttribute(
      'href',
      '/boards'
    );
  });
});
