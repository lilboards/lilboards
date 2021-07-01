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

it('renders boards button', () => {
  renderWithStore(<Header />);
  expect(screen.getByRole('button', { name: 'Boards' })).toHaveAttribute(
    'href',
    '/boards'
  );
});

describe('without user email', () => {
  it('renders login button', () => {
    updateStore.withUser(false);
    renderWithStore(<Header />);
    expect(screen.getByRole('button', { name: 'Login' })).toHaveAttribute(
      'href',
      '/login'
    );
  });
});

describe('with user email', () => {
  it('renders logout button', () => {
    updateStore.withUser();
    renderWithStore(<Header />);
    expect(screen.getByRole('button', { name: 'Logout' })).toHaveAttribute(
      'href',
      '/logout'
    );
  });
});
