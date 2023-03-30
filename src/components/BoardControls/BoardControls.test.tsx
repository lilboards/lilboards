import { screen } from '@testing-library/react';

import { renderWithProviders, updateStore } from '../../utils/test';
import BoardControls from './BoardControls';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
  generateId: jest.fn(),
}));

it('does not throw error when board is invalid', () => {
  expect(() => {
    renderWithProviders(<BoardControls boardId="" />);
  }).not.toThrow();
});

it('renders "Add column" button', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithProviders(<BoardControls boardId={board.id} />);
  expect(
    screen.getByRole('button', { name: 'Add column' })
  ).toBeInTheDocument();
});

it('renders "Timer" input and "Start" button', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithProviders(<BoardControls boardId={board.id} />);
  expect(screen.getByLabelText('Timer in minutes')).toBeInTheDocument();
  expect(screen.getByLabelText('Start timer')).toBeInTheDocument();
});

it('renders "Hide Likes" switch', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithProviders(<BoardControls boardId={board.id} />);
  expect(screen.getByLabelText('Hide Likes')).toBeInTheDocument();
});

it('renders "Sort by likes" button', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithProviders(<BoardControls boardId={board.id} />);
  expect(
    screen.getByRole('button', { name: 'Sort by likes' })
  ).toBeInTheDocument();
});

it('renders copy board icon button', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithProviders(<BoardControls boardId={board.id} />);
  expect(screen.getByLabelText('Copy board as Markdown')).toBe(
    screen.getByRole('button', { name: 'Copy board as Markdown' })
  );
});
