import { fireEvent, screen } from '@testing-library/react';
import { generateId, logEvent, saveUserListId } from 'src/firebase';
import { DATE_NOW as dateNow, LIST_TEST_ID as listId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';

import AddList from './AddList';

jest.mock('src/firebase', () => ({
  generateId: jest.fn(),
  logEvent: jest.fn(),
  saveUserListId: jest.fn(),
}));

const mockedGenerateId = jest.mocked(generateId);

beforeEach(() => {
  jest.clearAllMocks();
  mockedGenerateId.mockReturnValue(listId);
});

it('renders "Add list" button', () => {
  renderWithProviders(<AddList />);
  expect(screen.getByRole('button', { name: 'Add list' })).toBeInTheDocument();
});

it('adds new list to store and database', () => {
  const user = updateStore.withUser();
  renderWithProviders(<AddList />);
  const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(dateNow);
  fireEvent.click(screen.getByText('Add list'));
  expect(store.getState().lists).toEqual({
    list_test_id: {
      createdAt: 1234567890,
      createdBy: 'user_test_id',
      name: '',
    },
  });
  expect(saveUserListId).toBeCalledTimes(1);
  expect(saveUserListId).toBeCalledWith(user.id, listId);
  dateNowSpy.mockRestore();
});

it('logs add list event', () => {
  updateStore.withUser();
  renderWithProviders(<AddList />);
  fireEvent.click(screen.getByText('Add list'));
  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toBeCalledWith('create_list');
});
