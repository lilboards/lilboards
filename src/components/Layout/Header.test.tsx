import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import Header from './Header';

it('renders correctly', () => {
  const { container } = renderWithStore(<Header />);
  expect(container).toMatchSnapshot();
});

it('renders header', () => {
  renderWithStore(<Header />);
  expect(screen.getByRole('banner')).toHaveTextContent('Lilboards');
});

it('renders heading link', () => {
  renderWithStore(<Header />);
  expect(screen.getByRole('link', { name: 'Lilboards' })).toHaveAttribute(
    'href',
    '/'
  );
});

describe('when not logged in', () => {
  it('renders login button link', () => {
    updateStore.withUser(false);
    renderWithStore(<Header />);
    expect(screen.getByRole('button', { name: 'Login' })).toHaveAttribute(
      'href',
      '/login'
    );
  });

  it('does not render boards button link', () => {
    updateStore.withUser(false);
    renderWithStore(<Header />);
    expect(
      screen.queryByRole('button', { name: 'Boards' })
    ).not.toBeInTheDocument();
  });
});

describe('when logged in', () => {
  it('renders logout button link', () => {
    updateStore.withUser();
    renderWithStore(<Header />);
    expect(screen.getByRole('button', { name: 'Logout' })).toHaveAttribute(
      'href',
      '/logout'
    );
  });

  it('renders boards button link', () => {
    updateStore.withUser();
    renderWithStore(<Header />);
    expect(screen.getByRole('button', { name: 'Boards' })).toHaveAttribute(
      'href',
      '/boards'
    );
  });
});
