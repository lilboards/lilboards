import { screen } from '@testing-library/react';
import {
  BOARD_TEST_ID as boardId,
  USER_TEST_ID as userId,
} from '../../constants/test';
import { getBoardDataRef } from '../../firebase';
import { history, renderWithContext, updateStore } from '../../utils/test';
import Board from './Board';

import { Board as BoardType, EventType } from '../../types';

jest.mock('../../firebase', () => ({
  getBoardDataRef: jest.fn(),
}));

jest.mock('../Columns', () => () => <>Columns</>);

beforeEach(() => {
  (getBoardDataRef as jest.Mock).mockReturnValueOnce({
    on: jest.fn((eventType, callback) => {
      if (eventType === EventType.value) {
        const boardSnapshot = {
          val: () => null,
        };
        callback(boardSnapshot);
      }
    }),
    off: jest.fn(),
  });
});

it('renders nothing when there is no board id', async () => {
  const { baseElement } = renderWithContext(<Board />);
  await screen.findAllByText('');
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders nothing when there is no board', async () => {
  const { baseElement } = renderWithContext(<Board boardId={boardId} />);
  await screen.findAllByText('');
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('redirects to "/404" when board is not found', async () => {
  renderWithContext(<Board boardId={boardId} />);
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

it('renders "Add column" button', () => {
  updateStore.withUser();
  const board = updateStore.withBoard();
  renderWithContext(<Board boardId={board.id} />);
  expect(
    screen.getByRole('button', { name: 'Add column' })
  ).toBeInTheDocument();
});

it('renders columns', async () => {
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

  let boardRefOn: jest.Mock;
  let boardRefOff: jest.Mock;

  beforeEach(() => {
    boardRefOn = jest.fn((eventType, callback) => {
      if (eventType === EventType.value) {
        const boardSnapshot = {
          val: (): BoardType => board,
        };
        callback(boardSnapshot);
      }
    });

    (getBoardDataRef as jest.Mock).mockReset().mockReturnValueOnce({
      on: boardRefOn,
      off: (boardRefOff = jest.fn()),
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
    expect(boardRefOn).toBeCalledTimes(1);
    expect(boardRefOn).toBeCalledWith(EventType.value, expect.any(Function));

    unmount();
    expect(boardRefOff).toBeCalledTimes(1);
    expect(boardRefOff).toBeCalledWith(EventType.value);
  });
});
