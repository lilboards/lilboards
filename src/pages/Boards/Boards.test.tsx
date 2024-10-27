import { fireEvent, screen } from '@testing-library/react';
import { getBoardVal, getUserBoardsVal } from 'src/firebase';
import { Board } from 'src/types';
import { BOARD_TEST_ID as boardId } from 'test/constants';
import { renderWithProviders, updateStore } from 'test/utils';

import Boards from './Boards';

jest.mock('src/firebase', () => ({
  ...jest.requireActual('src/firebase'),
  getBoardVal: jest.fn(),
  getUserBoardsVal: jest.fn(),
  logEvent: jest.fn(),
}));

const mockedGetBoardVal = jest.mocked(getBoardVal);
const mockedGetUserBoardsVal = jest.mocked(getUserBoardsVal);

beforeEach(() => {
  jest.clearAllMocks();
  mockedGetBoardVal.mockResolvedValueOnce(null);
  mockedGetUserBoardsVal.mockResolvedValueOnce(null);
});

it('renders heading', () => {
  renderWithProviders(<Boards />);
  const heading = screen.getByRole('heading', { level: 1, name: 'Boards' });
  expect(heading).toBeInTheDocument();
});

describe('add board', () => {
  it('renders button', () => {
    renderWithProviders(<Boards />);
    expect(
      screen.getByRole('button', { name: 'Add board' }),
    ).toBeInTheDocument();
  });

  it('adds board', () => {
    updateStore.withUser();
    renderWithProviders(<Boards />);
    fireEvent.click(screen.getByText('Add board'));
    expect(screen.getAllByLabelText('Board Name')).toHaveLength(1);
  });

  it('adds boards', () => {
    updateStore.withUser();
    renderWithProviders(<Boards />);
    const length = 2;
    Array.from({ length }, () =>
      fireEvent.click(screen.getByText('Add board')),
    );
    expect(screen.getAllByLabelText('Board Name')).toHaveLength(length);
  });

  it('focuses on board', () => {
    updateStore.withUser();
    renderWithProviders(<Boards />);
    fireEvent.click(screen.getByText('Add board'));
    expect(screen.getByPlaceholderText('Untitled Board')).toHaveFocus();
  });
});

describe('mount', () => {
  beforeEach(() => {
    mockedGetUserBoardsVal.mockReset().mockResolvedValueOnce({
      [`${boardId}1`]: true,
      [`${boardId}2`]: true,
      [`${boardId}3`]: false,
    });

    mockedGetBoardVal
      .mockReset()
      .mockResolvedValueOnce({ name: 'Board 1' } as Board)
      .mockResolvedValueOnce({ name: 'Board 2' } as Board)
      .mockResolvedValueOnce(null);
  });

  it('loads boards', async () => {
    updateStore.withUser();
    renderWithProviders(<Boards />);
    const boards = await screen.findAllByLabelText('Board Name');
    expect(boards).toHaveLength(2);
  });
});
