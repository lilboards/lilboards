import { screen } from '@testing-library/react';
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

jest.mock('../BoardControls', () => () => <p>BoardControls</p>);
jest.mock('../Columns', () => () => <p>Columns</p>);

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
  const { baseElement } = renderWithContext(<Board />);
  await screen.findAllByText('');
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders nothing when there is no board', async () => {
  const { baseElement } = renderWithContext(<Board boardId="invalid" />);
  await screen.findAllByText('');
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('redirects to "/404" when board is not found', async () => {
  renderWithContext(<Board boardId="invalid" />);
  // wait for redirect
  await screen.findAllByText('');
  expect(history.location.pathname).toBe('/404');
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
  expect(await screen.findByText('BoardControls')).toBeInTheDocument();
});

it('renders <Columns>', async () => {
  const board = updateStore.withBoard();
  renderWithContext(<Board boardId={board.id} />);
  expect(await screen.findByText('Columns')).toBeInTheDocument();
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
