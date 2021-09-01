import { screen } from '@testing-library/react';
import { renderWithContext, updateStore } from '../../utils/test';
import BoardControls from './BoardControls';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
  generateId: jest.fn(),
}));

it('does not throw error when board is invalid', () => {
  expect(() => {
    renderWithContext(<BoardControls boardId="" />);
  }).not.toThrow();
});

it('renders "Add column" button', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithContext(<BoardControls boardId={board.id} />);
  expect(
    screen.getByRole('button', { name: 'Add column' })
  ).toBeInTheDocument();
});

it('renders "Timer" input and "Start" button', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithContext(<BoardControls boardId={board.id} />);
  expect(screen.getByLabelText('Timer in minutes')).toBeInTheDocument();
  expect(screen.getByLabelText('Start timer')).toBeInTheDocument();
});

it('renders "Present" switch', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithContext(<BoardControls boardId={board.id} />);
  expect(screen.getByLabelText('Present')).toBeInTheDocument();
});

it('renders "Sort by likes" button', () => {
  const board = updateStore.withBoard();
  renderWithContext(<BoardControls boardId={board.id} />);
  expect(
    screen.getByRole('button', { name: 'Sort by likes' })
  ).toBeInTheDocument();
});
