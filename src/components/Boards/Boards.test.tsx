import '../../store/boardsSlice';

import { fireEvent, screen } from '@testing-library/react';

import {
  BOARD_TEST_ID as boardId,
  DATE_NOW as dateNow,
} from '../../constants/test';
import {
  generateId,
  getBoardVal,
  getUserBoardsVal,
  saveUserBoardId,
} from '../../firebase';
import {
  getStoreState,
  renderWithContext,
  updateStore,
} from '../../utils/test';
import Boards from './Boards';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
  generateId: jest.fn(),
  getBoardVal: jest.fn(),
  getUserBoardsVal: jest.fn(),
  saveUserBoardId: jest.fn(),
}));

beforeEach(() => {
  (generateId as jest.Mock).mockReturnValue(boardId);
  (getBoardVal as jest.Mock).mockResolvedValueOnce(null);
  (getUserBoardsVal as jest.Mock).mockResolvedValueOnce(null);
  (saveUserBoardId as jest.Mock).mockClear();
});

it('renders heading', () => {
  renderWithContext(<Boards />);
  const heading = screen.getByRole('heading', { level: 1, name: 'Boards' });
  expect(heading).toBeInTheDocument();
});

it('renders "Create board" button', () => {
  renderWithContext(<Boards />);
  expect(screen.getByLabelText('Create board')).toBeInTheDocument();
});

describe('create board', () => {
  it('renders new board', () => {
    updateStore.withUser();
    renderWithContext(<Boards />);
    fireEvent.click(screen.getByLabelText('Create board'));
    const boards = screen.getAllByLabelText('Board Name');
    expect(boards).toHaveLength(1);
  });

  it('focuses on new board', () => {
    updateStore.withUser();
    renderWithContext(<Boards />);
    fireEvent.click(screen.getByLabelText('Create board'));
    expect(screen.getByPlaceholderText('Untitled Board')).toHaveFocus();
  });

  it('saves new board to store and database', () => {
    const user = updateStore.withUser();
    renderWithContext(<Boards />);
    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(dateNow);
    fireEvent.click(screen.getByLabelText('Create board'));
    expect(getStoreState().boards).toMatchInlineSnapshot(`
      Object {
        "board_test_id": Object {
          "createdAt": 1234567890,
          "createdBy": "user_test_id",
          "name": "",
        },
      }
    `);
    expect(saveUserBoardId).toBeCalledTimes(1);
    expect(saveUserBoardId).toBeCalledWith(user.id, boardId);
    dateNowSpy.mockRestore();
  });
});

describe('mount', () => {
  beforeEach(() => {
    (getUserBoardsVal as jest.Mock).mockReset().mockResolvedValueOnce({
      [`${boardId}1`]: true,
      [`${boardId}2`]: true,
      [`${boardId}3`]: false,
    });

    (getBoardVal as jest.Mock)
      .mockReset()
      .mockResolvedValueOnce({ name: 'Board 1' })
      .mockResolvedValueOnce({ name: 'Board 2' })
      .mockResolvedValueOnce(null);
  });

  it('loads boards', async () => {
    updateStore.withUser();
    renderWithContext(<Boards />);
    const boards = await screen.findAllByLabelText('Board Name');
    expect(boards).toHaveLength(2);
  });
});
