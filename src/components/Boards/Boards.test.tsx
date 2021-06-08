import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import { boardsRef } from '../../firebase';
import Boards from './Boards';

jest.mock('../../firebase', () => ({
  boardsRef: {
    once: jest.fn(),
  },
}));

it('renders heading', () => {
  renderWithStore(<Boards />);
  expect(screen.getByRole('heading', { level: 1 })).toBe(
    screen.getByText('Boards')
  );
});

it('renders "Create board" button', () => {
  renderWithStore(<Boards />);
  expect(screen.getByLabelText('Create board')).toBeInTheDocument();
});

it('creates board', async () => {
  updateStore.withUser();
  renderWithStore(<Boards />);
  fireEvent.click(screen.getByLabelText('Create board'));
  const boards = await screen.findAllByLabelText('Board Name');
  expect(boards).toHaveLength(1);
  expect(screen.getByPlaceholderText('Untitled Board')).toBe(boards[0]);
  expect(boards[0]).toHaveFocus();
});

it('edits board', async () => {
  updateStore.withBoard();
  renderWithStore(<Boards />);
  const value = 'My Board Name';
  fireEvent.change(screen.getByLabelText('Board Name'), { target: { value } });
  const inputs = await screen.findAllByDisplayValue(value);
  expect(inputs).toHaveLength(1);
});

it('deletes board', () => {
  updateStore.withBoard();
  updateStore.withUser();
  renderWithStore(<Boards />);
  fireEvent.click(screen.getByLabelText(/Delete board/));
  expect(screen.queryByLabelText('Board Name')).not.toBeInTheDocument();
});

describe('mount', () => {
  beforeAll(() => {
    updateStore.withUser();
    const dataSnapshot = {
      val: () => ({
        board1: {
          id: 'board1',
          name: 'Board 1',
        },
        board2: {
          id: 'board2',
          name: 'Board 2',
        },
      }),
    };
    (boardsRef.once as jest.Mock).mockImplementationOnce(
      (eventType, successCallback) =>
        eventType === 'value' && successCallback(dataSnapshot)
    );
    renderWithStore(<Boards />);
  });

  it('loads boards', async () => {
    const boards = await screen.findAllByLabelText('Board Name');
    expect(boards).toHaveLength(2);
  });
});
