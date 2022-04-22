import { screen, waitFor } from '@testing-library/react';
import { onValue } from 'firebase/database';

import {
  BOARD_TEST_ID as boardId,
  USER_TEST_ID as userId,
} from '../../constants/test';
import { getBoardDataRef } from '../../firebase';
import { Board as BoardType } from '../../types';
import { history, renderWithContext, updateStore } from '../../utils/test';
import Board from './Board';

jest.mock('firebase/database', () => ({
  onValue: jest.fn(),
}));

jest.mock('../../firebase', () => ({
  getBoardDataRef: jest.fn(),
}));

jest.mock('../BoardControls', () => () => <p>Board Controls</p>);
jest.mock('../Columns', () => () => <p>Columns</p>);

const boardControls = 'Board Controls';
const columns = 'Columns';

const unsubscribe = jest.fn();

beforeEach(() => {
  (onValue as jest.Mock).mockImplementationOnce((query, callback) => {
    callback({
      val: () => null,
    });
    return unsubscribe;
  });

  unsubscribe.mockClear();
});

it('renders nothing when there is no board id', async () => {
  renderWithContext(<Board />);
  await waitFor(() => expect(screen.queryByText(boardControls)).toBe(null));
  expect(screen.queryByText(columns)).toBe(null);
});

it('renders nothing when there is no board', async () => {
  renderWithContext(<Board boardId="invalid" />);
  await waitFor(() => expect(screen.queryByText(columns)).toBe(null));
});

it('redirects to "/404" when board is not found', async () => {
  renderWithContext(<Board boardId="invalid" />);
  await waitFor(() => expect(history.location.pathname).toBe('/404'));
});

it('renders board name as heading', async () => {
  const board = updateStore.withBoard();
  renderWithContext(<Board boardId={board.id} />);
  expect(await screen.findByRole('heading', { level: 1 })).toBe(
    await screen.findByText(board.name)
  );
});

it('renders <BoardControls>', async () => {
  const board = updateStore.withBoard();
  renderWithContext(<Board boardId={board.id} />);
  expect(await screen.findByText(boardControls)).toBeInTheDocument();
});

it('renders <Columns>', async () => {
  const board = updateStore.withBoard();
  renderWithContext(<Board boardId={board.id} />);
  expect(await screen.findByText(columns)).toBeInTheDocument();
});

describe('with board and anonymous user', () => {
  const board: BoardType = {
    createdAt: Date.now(),
    createdBy: userId,
    name: 'Board Name',
    updatedAt: Date.now(),
  };
  const boardDataRef = 'boardDataRef';

  beforeEach(() => {
    (getBoardDataRef as jest.Mock).mockReturnValueOnce(boardDataRef);

    (onValue as jest.Mock)
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        callback({
          val: (): BoardType => board,
        });
        return unsubscribe;
      });
  });

  it('loads board', async () => {
    renderWithContext(<Board boardId={boardId} />);
    const heading = await screen.findByRole('heading', {
      level: 1,
      name: board.name,
    });
    expect(heading).toBeInTheDocument();
  });

  it('attaches ref listeners', () => {
    const { unmount } = renderWithContext(<Board boardId={boardId} />);
    expect(getBoardDataRef).toBeCalledTimes(1);
    expect(getBoardDataRef).toBeCalledWith(boardId);
    expect(onValue).toBeCalledTimes(1);
    expect(onValue).toBeCalledWith(boardDataRef, expect.any(Function));

    unmount();
    expect(unsubscribe).toBeCalledTimes(1);
  });
});
