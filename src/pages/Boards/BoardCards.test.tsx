import { screen } from '@testing-library/react';
import { renderWithProviders, updateStore } from 'test/utils';

import BoardCards from './BoardCards';

jest.mock('src/firebase', () => ({
  ...jest.requireActual('src/firebase'),
  getBoardVal: jest.fn(),
  getUserBoardsVal: jest.fn(),
}));

it('renders nothing when there are no boards', () => {
  renderWithProviders(<BoardCards />);
  expect(screen.queryByLabelText('Board Name')).not.toBeInTheDocument();
});

it('renders BoardCard', () => {
  const board = updateStore.withBoard();
  renderWithProviders(<BoardCards />);
  expect(screen.getByDisplayValue(board.name)).toBe(
    screen.getByLabelText('Board Name'),
  );
});
