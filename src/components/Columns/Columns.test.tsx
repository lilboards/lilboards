import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import { getColumnsRef, getItemsRef } from '../../firebase';
import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  ITEM_TEST_ID as itemId,
} from '../../constants/test';
import Columns from './Columns';

jest.mock('../../firebase', () => ({
  getColumnsRef: jest.fn(),
  getItemsRef: jest.fn(),
}));

beforeEach(() => {
  (getColumnsRef as jest.Mock).mockReturnValueOnce({
    off: jest.fn(),
    on: jest.fn(),
  });
  (getItemsRef as jest.Mock).mockReturnValueOnce({
    off: jest.fn(),
    on: jest.fn(),
  });
});

it('renders column', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  renderWithStore(<Columns boardId={board.id} />);
  expect(screen.getByLabelText('Column Name')).toBe(
    screen.getByDisplayValue(column.name)
  );
});

describe('mount', () => {
  let columnsRefOff: jest.Mock;
  let columnsRefOn: jest.Mock;
  let itemsRefOff: jest.Mock;
  let itemsRefOn: jest.Mock;

  beforeEach(() => {
    columnsRefOff = jest.fn();
    columnsRefOn = jest.fn((eventType, successCallback) => {
      if (eventType === 'value') {
        const snapshot = {
          val: () => ({
            [columnId]: {
              created: Date.now(),
              name: '',
              updated: Date.now(),
            },
          }),
        };
        successCallback(snapshot);
      }
    });
    (getColumnsRef as jest.Mock).mockReset().mockReturnValueOnce({
      off: columnsRefOff,
      on: columnsRefOn,
    });

    itemsRefOff = jest.fn();
    itemsRefOn = jest.fn((eventType, successCallback) => {
      if (eventType === 'value') {
        const snapshot = {
          val: () => ({
            [itemId]: {
              created: 0,
              name: '',
              updated: 0,
            },
          }),
        };
        successCallback(snapshot);
      }
    });
    (getItemsRef as jest.Mock).mockReset().mockReturnValueOnce({
      off: itemsRefOff,
      on: itemsRefOn,
    });
  });

  it('loads columns', async () => {
    renderWithStore(<Columns boardId={boardId} />);
    expect(await screen.findAllByRole('textbox')).toHaveLength(1);
  });

  it('renders default column name', async () => {
    renderWithStore(<Columns boardId={boardId} />);
    expect(await screen.findByPlaceholderText('Column 1')).toBeInTheDocument();
  });

  it('removes columns on unmount', async () => {
    const { unmount } = renderWithStore(<Columns boardId={boardId} />);
    expect(await screen.findAllByPlaceholderText('Column 1')).toHaveLength(1);
    unmount();
    expect(screen.queryAllByPlaceholderText('Column 1')).toHaveLength(0);
  });

  it('listens to columns and items from database', () => {
    const { unmount } = renderWithStore(<Columns boardId={boardId} />);
    expect(columnsRefOn).toHaveBeenCalledTimes(1);
    expect(itemsRefOn).toHaveBeenCalledTimes(1);
    unmount();
    expect(columnsRefOff).toHaveBeenCalledTimes(1);
    expect(itemsRefOff).toHaveBeenCalledTimes(1);
  });
});
