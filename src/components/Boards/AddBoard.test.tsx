import { fireEvent, screen } from '@testing-library/react';

import {
  BOARD_TEST_ID as boardId,
  DATE_NOW as dateNow,
} from '../../constants/test';
import { generateId, logEvent, saveUserBoardId } from '../../firebase';
import { renderWithProviders, store, updateStore } from '../../utils/test';
import AddBoard from './AddBoard';

jest.mock('../../firebase', () => ({
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
  expect(store.getState().boards).toMatchInlineSnapshot(`
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

it('logs add board event', () => {
  updateStore.withUser();
  renderWithProviders(<AddBoard />);
  fireEvent.click(screen.getByText('Add board'));
  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toBeCalledWith('create_board');
});
