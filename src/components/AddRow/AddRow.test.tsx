import { fireEvent, screen } from '@testing-library/react';
import { generateId, logEvent } from 'src/firebase';
import { dateNow, rowId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';

import AddRow from '.';

jest.mock('src/firebase', () => ({
  logEvent: jest.fn(),
  generateId: jest.fn(),
}));

const mockedGenerateId = jest.mocked(generateId);

beforeEach(() => {
  mockedGenerateId.mockReturnValue(rowId);
});

it('renders "Add row" button when user can edit', () => {
  const list = updateStore.withList();
  updateStore.withUser();
  renderWithProviders(<AddRow listId={list.id} />);
  expect(screen.getByRole('button', { name: 'Add row' })).toBeInTheDocument();
});

it('does not render "Add row" button when user cannot edit', () => {
  const list = updateStore.withList();
  renderWithProviders(<AddRow listId={list.id} />);
  expect(
    screen.queryByRole('button', { name: 'Add row' }),
  ).not.toBeInTheDocument();
});

it('adds new row', () => {
  const list = updateStore.withList();
  updateStore.withUser();
  renderWithProviders(<AddRow listId={list.id} />);
  expect(store.getState().rows).toEqual({});
  const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(dateNow);
  fireEvent.click(screen.getByText('Add row'));
  expect(store.getState().rows).toEqual({
    row_test_id: {
      createdAt: 1234567890,
      createdBy: 'user_test_id',
      name: '',
    },
  });
  expect(logEvent).toHaveBeenCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith('create_row');
  dateNowSpy.mockRestore();
});
