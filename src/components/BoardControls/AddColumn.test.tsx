import { fireEvent, screen } from '@testing-library/react';
import {
  renderWithContext,
  getStoreState,
  updateStore,
} from '../../utils/test';
import { firebaseAnalytics, generateId } from '../../firebase';
import {
  COLUMN_TEST_ID as columnId,
  DATE_NOW as dateNow,
} from '../../constants/test';
import AddColumn from './AddColumn';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
  generateId: jest.fn(),
}));

beforeEach(() => {
  (generateId as jest.Mock).mockReturnValue(columnId);
});

it('renders "Add column" button when user can edit', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithContext(<AddColumn boardId={board.id} />);
  expect(
    screen.getByRole('button', { name: 'Add column' })
  ).toBeInTheDocument();
});

it('does not render "Add column" button when user cannot edit', () => {
  const board = updateStore.withBoard();
  renderWithContext(<AddColumn boardId={board.id} />);
  expect(
    screen.queryByRole('button', { name: 'Add column' })
  ).not.toBeInTheDocument();
});

it('adds new column', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithContext(<AddColumn boardId={board.id} />);
  expect(getStoreState().columns).toEqual({});
  const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(dateNow);
  fireEvent.click(screen.getByText('Add column'));
  expect(getStoreState().columns).toMatchInlineSnapshot(`
      Object {
        "column_test_id": Object {
          "createdAt": 1234567890,
          "createdBy": "user_test_id",
          "name": "",
        },
      }
    `);
  expect(firebaseAnalytics.logEvent).toBeCalledTimes(1);
  expect(firebaseAnalytics.logEvent).toBeCalledWith('create_column');
  dateNowSpy.mockRestore();
});
