import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import Header from './Header';

it('renders correctly', () => {
  const { container } = renderWithStore(<Header />);
  expect(container).toMatchSnapshot();
});

it('renders header', () => {
  renderWithStore(<Header />);
  const headerElement = screen.getByRole('banner');
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveTextContent('Lilboards');
});

it('renders login button', () => {
  renderWithStore(<Header />);
  expect(screen.getByText('Login')).toBeInTheDocument();
});

it('renders logout button', () => {
  updateStore.withUser();
  renderWithStore(<Header />);
  expect(screen.getByText('Logout')).toBeInTheDocument();
});
