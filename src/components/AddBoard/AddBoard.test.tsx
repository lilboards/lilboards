import { fireEvent, screen } from '@testing-library/react';
import { generateId, logEvent, saveUserBoardId } from 'src/firebase';
import { BOARD_TEST_ID as boardId, DATE_NOW as dateNow } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';

import AddBoard from './AddBoard';

jest.mock('src/firebase', () => ({
  generateId: jest.fn(),
  logEvent: jest.fn(),
  saveUserBoardId: jest.fn(),
}));

const mockedGenerateId = jest.mocked(generateId);

beforeEach(() => {
  jest.clearAllMocks();
  mockedGenerateId.mockReturnValue(boardId);
});

it('renders "Add board" button', () => {
  renderWithProviders(<AddBoard />);
  expect(screen.getByRole('button', { name: 'Add board' })).toBeInTheDocument();
});

it('adds new board to store and database', () => {
  const user = updateStore.withUser();
  renderWithProviders(<AddBoard />);
  const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(dateNow);
  fireEvent.click(screen.getByText('Add board'));
  expect(store.getState().boards).toEqual({
    board_test_id: {
      createdAt: 1234567890,
      createdBy: 'user_test_id',
      name: '',
    },
  });
  expect(saveUserBoardId).toHaveBeenCalledTimes(1);
  expect(saveUserBoardId).toHaveBeenCalledWith(user.id, boardId);
  dateNowSpy.mockRestore();
});

it('logs add board event', () => {
  updateStore.withUser();
  renderWithProviders(<AddBoard />);
  fireEvent.click(screen.getByText('Add board'));
  expect(logEvent).toHaveBeenCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith('create_board');
});
