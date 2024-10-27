import { screen, waitFor } from '@testing-library/react';
import type { DatabaseReference, DataSnapshot } from 'firebase/database';
import { onValue } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { getBoardDataRef } from 'src/firebase';
import { Board as BoardType } from 'src/types';
import {
  BOARD_TEST_ID as boardId,
  USER_TEST_ID as userId,
} from 'test/constants';
import { renderWithProviders, router, updateStore } from 'test/utils';

import Board from './Board';

const mockedOnValue = jest.mocked(onValue);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockedUseParams = jest.mocked(useParams);

jest.mock('src/firebase', () => ({
  getBoardDataRef: jest.fn(),
}));

const mockedGetBoardDataRef = jest.mocked(getBoardDataRef);

jest.mock('src/components/BoardControls', () => () => <p>Board Controls</p>);
jest.mock('src/components/Columns', () => () => <p>Columns</p>);

const boardControls = 'Board Controls';
const columns = 'Columns';

const unsubscribe = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('no board', () => {
  beforeEach(() => {
    mockedOnValue.mockImplementationOnce((query, callback) => {
      callback({ val: () => null } as DataSnapshot);
      return unsubscribe;
    });
  });

  it('renders nothing when there is no board id', async () => {
    mockedUseParams.mockReturnValue({});
    renderWithProviders(<Board />);
    await waitFor(() => expect(screen.queryByText(boardControls)).toBe(null));
    expect(screen.queryByText(columns)).toBe(null);
  });

  it('renders nothing when there is no board', async () => {
    mockedUseParams.mockReturnValue({ boardId: 'invalid' });
    renderWithProviders(<Board />);
    await waitFor(() => expect(screen.queryByText(columns)).toBe(null));
  });

  it('redirects to "/404" when board is not found', async () => {
    mockedUseParams.mockReturnValue({ boardId: 'invalid' });
    renderWithProviders(<Board />);
    await waitFor(() => expect(router.state.location.pathname).toBe('/404'));
  });
});

describe('with board', () => {
  beforeEach(() => {
    const board = updateStore.withBoard();
    mockedUseParams.mockReturnValue({ boardId: board.id });
    mockedOnValue.mockReset().mockImplementationOnce((query, callback) => {
      callback({ val: () => board } as DataSnapshot);
      return unsubscribe;
    });
  });

  describe('breadcrumbs', () => {
    it('renders boards link', () => {
      renderWithProviders(<Board />);
      expect(screen.getByRole('link', { name: 'Boards' })).toHaveAttribute(
        'href',
        '/boards',
      );
    });
  });

  describe('board name', () => {
    it('does not render board name as heading', () => {
      const board = updateStore.withBoard({ name: '' });
      mockedUseParams.mockReturnValue({ boardId: board.id });
      mockedOnValue.mockReset().mockImplementationOnce((query, callback) => {
        callback({ val: () => board } as DataSnapshot);
        return unsubscribe;
      });
      renderWithProviders(<Board />);
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('');
    });

    it('renders board name as heading', () => {
      const board = updateStore.withBoard();
      mockedUseParams.mockReturnValue({ boardId: board.id });
      mockedOnValue.mockReset().mockImplementationOnce((query, callback) => {
        callback({ val: () => board } as DataSnapshot);
        return unsubscribe;
      });
      renderWithProviders(<Board />);
      expect(screen.getByRole('heading', { level: 1 })).toBe(
        screen.getByText(board.name),
      );
    });
  });

  it('renders <BoardControls>', () => {
    renderWithProviders(<Board />);
    expect(screen.getByText(boardControls)).toBeInTheDocument();
  });

  it('renders <Columns>', () => {
    renderWithProviders(<Board />);
    expect(screen.getByText(columns)).toBeInTheDocument();
  });
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
    mockedGetBoardDataRef.mockReturnValueOnce(
      boardDataRef as unknown as DatabaseReference,
    );
    mockedOnValue.mockReset().mockImplementationOnce((query, callback) => {
      callback({ val: (): BoardType => board } as DataSnapshot);
      return unsubscribe;
    });
  });

  it('loads board', async () => {
    mockedUseParams.mockReturnValue({ boardId });
    renderWithProviders(<Board />);
    const heading = await screen.findByRole('heading', {
      level: 1,
      name: board.name,
    });
    expect(heading).toBeInTheDocument();
  });

  it('attaches ref listeners', () => {
    mockedUseParams.mockReturnValue({ boardId });
    const { unmount } = renderWithProviders(<Board />);
    expect(getBoardDataRef).toBeCalledTimes(1);
    expect(getBoardDataRef).toBeCalledWith(boardId);
    expect(onValue).toBeCalledTimes(1);
    expect(onValue).toBeCalledWith(boardDataRef, expect.any(Function));

    unmount();
    expect(unsubscribe).toBeCalledTimes(1);
  });
});
