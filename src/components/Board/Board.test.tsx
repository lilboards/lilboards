import { screen, waitFor } from '@testing-library/react';
import { onValue } from 'firebase/database';
import { useParams } from 'react-router-dom';

import {
  BOARD_TEST_ID as boardId,
  USER_TEST_ID as userId,
} from '../../constants/test';
import { getBoardDataRef } from '../../firebase';
import { Board as BoardType } from '../../types';
import { renderWithContext, router, updateStore } from '../../utils/test';
import Board from './Board';

jest.mock('firebase/database', () => ({
  onValue: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockedUseParams = jest.mocked(useParams);

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
  jest.clearAllMocks();
});

it('renders nothing when there is no board id', async () => {
  mockedUseParams.mockReturnValue({});
  renderWithContext(<Board />);
  await waitFor(() => expect(screen.queryByText(boardControls)).toBe(null));
  expect(screen.queryByText(columns)).toBe(null);
});

it('renders nothing when there is no board', async () => {
  mockedUseParams.mockReturnValue({ boardId: 'invalid' });
  renderWithContext(<Board />);
  await waitFor(() => expect(screen.queryByText(columns)).toBe(null));
});

it('redirects to "/404" when board is not found', async () => {
  mockedUseParams.mockReturnValue({ boardId: 'invalid' });
  renderWithContext(<Board />);
  await waitFor(() => expect(router.state.location.pathname).toBe('/404'));
});

it('renders board name as heading', async () => {
  const board = updateStore.withBoard();
  mockedUseParams.mockReturnValue({ boardId: board.id });
  renderWithContext(<Board />);
  expect(await screen.findByRole('heading', { level: 1 })).toBe(
    await screen.findByText(board.name)
  );
});

it('renders <BoardControls>', async () => {
  const board = updateStore.withBoard();
  mockedUseParams.mockReturnValue({ boardId: board.id });
  renderWithContext(<Board />);
  expect(await screen.findByText(boardControls)).toBeInTheDocument();
});

it('renders <Columns>', async () => {
  const board = updateStore.withBoard();
  mockedUseParams.mockReturnValue({ boardId: board.id });
  renderWithContext(<Board />);
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
    mockedUseParams.mockReturnValue({ boardId });
    renderWithContext(<Board />);
    const heading = await screen.findByRole('heading', {
      level: 1,
      name: board.name,
    });
    expect(heading).toBeInTheDocument();
  });

  it('attaches ref listeners', () => {
    mockedUseParams.mockReturnValue({ boardId });
    const { unmount } = renderWithContext(<Board />);
    expect(getBoardDataRef).toBeCalledTimes(1);
    expect(getBoardDataRef).toBeCalledWith(boardId);
    expect(onValue).toBeCalledTimes(1);
    expect(onValue).toBeCalledWith(boardDataRef, expect.any(Function));

    unmount();
    expect(unsubscribe).toBeCalledTimes(1);
  });
});
