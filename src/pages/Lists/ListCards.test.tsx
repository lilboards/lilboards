import { screen } from '@testing-library/react';
import { renderWithProviders, updateStore } from 'test/utils';
import { expect, it, vi } from 'vitest';

import ListCards from './ListCards';

vi.mock('src/firebase');

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
