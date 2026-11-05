import { screen } from '@testing-library/react';
import { renderWithProviders, updateStore } from 'test/utils';
import { expect, it, vi } from 'vitest';

import BoardCards from './BoardCards';

vi.mock('src/firebase');

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
