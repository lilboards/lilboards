import { fireEvent, screen } from '@testing-library/react';
import { generateId, logEvent, saveUserListId } from 'src/firebase';
import { dateNow, listId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';
import { beforeEach, expect, it, vi } from 'vitest';

import AddList from './AddList';

vi.mock('src/firebase');

const mockedGenerateId = vi.mocked(generateId);

beforeEach(() => {
  vi.clearAllMocks();
  mockedGenerateId.mockReturnValue(listId);
});

it('renders "Add list" button', () => {
  renderWithProviders(<AddList />);
  expect(screen.getByRole('button', { name: 'Add list' })).toBeInTheDocument();
});

it('adds new list to store and database', () => {
  const user = updateStore.withUser();
  renderWithProviders(<AddList />);
  const dateNowSpy = vi.spyOn(Date, 'now').mockReturnValue(dateNow);
  fireEvent.click(screen.getByText('Add list'));
  expect(store.getState().lists).toEqual({
    list_test_id: {
      createdAt: 1234567890,
      createdBy: 'user_test_id',
      name: '',
    },
  });
  expect(saveUserListId).toHaveBeenCalledTimes(1);
  expect(saveUserListId).toHaveBeenCalledWith(user.id, listId);
  dateNowSpy.mockRestore();
});

it('logs add list event', () => {
  updateStore.withUser();
  renderWithProviders(<AddList />);
  fireEvent.click(screen.getByText('Add list'));
  expect(logEvent).toHaveBeenCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith('create_list');
});
