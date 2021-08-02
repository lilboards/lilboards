import { screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test';
import Home from './Home';

it('renders home', () => {
  renderWithStore(<Home />);
  expect(
    screen.getByText('Create boards, columns, and items.')
  ).toBeInTheDocument();
});
