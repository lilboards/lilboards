import { screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test';
import Boards from './Boards';

beforeEach(() => {
  renderWithStore(<Boards />);
});

it('renders heading', () => {
  expect(screen.getByRole('heading', { level: 1 })).toBe(
    screen.getByText('Boards')
  );
});

it('renders create board button', () => {
  expect(screen.getByLabelText('Create board')).toBeInTheDocument();
});
