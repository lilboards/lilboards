import { fireEvent, screen } from '@testing-library/react';

import {
  COLUMN_TEST_ID as columnId,
  DATE_NOW as dateNow,
} from '../../../test/constants';
import { renderWithProviders, store, updateStore } from '../../../test/utils';
import { generateId, logEvent } from '../../firebase';
import AddColumn from './AddColumn';

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
  generateId: jest.fn(),
}));

const mockedGenerateId = jest.mocked(generateId);

beforeEach(() => {
  mockedGenerateId.mockReturnValue(columnId);
});

it('renders "Add column" button when user can edit', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithProviders(<AddColumn boardId={board.id} />);
  expect(
    screen.getByRole('button', { name: 'Add column' }),
  ).toBeInTheDocument();
});

it('does not render "Add column" button when user cannot edit', () => {
  const board = updateStore.withBoard();
  renderWithProviders(<AddColumn boardId={board.id} />);
  expect(
    screen.queryByRole('button', { name: 'Add column' }),
  ).not.toBeInTheDocument();
});

it('adds new column', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithProviders(<AddColumn boardId={board.id} />);
  expect(store.getState().columns).toEqual({});
  const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(dateNow);
  fireEvent.click(screen.getByText('Add column'));
  expect(store.getState().columns).toEqual({
    column_test_id: {
      createdAt: 1234567890,
      createdBy: 'user_test_id',
      name: '',
    },
  });
  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toBeCalledWith('create_column');
  dateNowSpy.mockRestore();
});
