import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import { boardsRef, usersRef } from '../../firebase';
import Boards from './Boards';

jest.mock('../../firebase', () => ({
  boardsRef: {
    child: jest.fn(),
    get: jest.fn(),
  },
  usersRef: {
    child: jest.fn(),
    get: jest.fn(),
  },
}));

beforeEach(() => {
  const snapshot = { val: () => null };
  (boardsRef.child as jest.Mock).mockReturnThis();
  (boardsRef.get as jest.Mock).mockResolvedValue(snapshot);
  (usersRef.child as jest.Mock).mockReturnThis();
  (usersRef.get as jest.Mock).mockResolvedValue(snapshot);
});

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

it('renders "Open board" link', () => {
  updateStore.withBoard();
  renderWithStore(<Boards />);
  expect(screen.getByText('Open board').closest('a')).toHaveAttribute(
    'href',
    '/boards/board1'
  );
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
  beforeEach(() => {
    (usersRef.get as jest.Mock).mockResolvedValueOnce({
      val: () => ({ board1: true, board2: true, board3: false }),
    });

    (boardsRef.get as jest.Mock)
      .mockResolvedValueOnce({ val: () => ({ name: 'Board 1' }) })
      .mockResolvedValueOnce({ val: () => ({ name: 'Board 2' }) })
      .mockResolvedValueOnce({ val: () => null });
  });

  it('loads boards', async () => {
    updateStore.withUser();
    renderWithStore(<Boards />);
    const boards = await screen.findAllByLabelText('Board Name');
    expect(boards).toHaveLength(2);
  });
});
