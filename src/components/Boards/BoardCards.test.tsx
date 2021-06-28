import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import BoardCards from './BoardCards';

it('renders nothing when there are no boards', () => {
  renderWithStore(<BoardCards />);
  expect(screen.queryByLabelText('Board Name')).not.toBeInTheDocument();
});

it('renders BoardCard', () => {
  const board = updateStore.withBoard();
  renderWithStore(<BoardCards />);
  expect(screen.getByDisplayValue(board.name)).toBe(
    screen.getByLabelText('Board Name')
  );
});
