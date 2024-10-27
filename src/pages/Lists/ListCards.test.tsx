import { screen } from '@testing-library/react';
import { renderWithProviders, updateStore } from 'test/utils';

import ListCards from './ListCards';

jest.mock('src/firebase', () => ({
  ...jest.requireActual('src/firebase'),
  getListVal: jest.fn(),
  getUserListsVal: jest.fn(),
}));

it('renders nothing when there are no boards', () => {
  renderWithProviders(<ListCards />);
  expect(screen.queryByLabelText('List Name')).not.toBeInTheDocument();
});

it('renders ListCard', () => {
  const board = updateStore.withList();
  renderWithProviders(<ListCards />);
  expect(screen.getByDisplayValue(board.name)).toBe(
    screen.getByLabelText('List Name'),
  );
});
