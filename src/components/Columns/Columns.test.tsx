import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import { getColumnsRef, getItemsRef } from '../../firebase';
import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../constants/test';
import Columns from './Columns';

import { Columns as ColumnsState, EventType, Item } from '../../types';

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
  expect(screen.getByText(column.name)).toBeInTheDocument();
});

describe('mount', () => {
  let columnsRefOff: jest.Mock;
  let columnsRefOn: jest.Mock;
  let itemsRefOff: jest.Mock;
  let itemsRefOn: jest.Mock;

  const columnName = 'My Column';
  const itemText = 'My Item';

  beforeEach(() => {
    columnsRefOff = jest.fn();

    columnsRefOn = jest.fn((eventType, successCallback) => {
      if (eventType === EventType.value) {
        const columnsSnapshot = {
          val: (): ColumnsState => ({
            [columnId]: {
              createdAt: Date.now(),
              createdBy: userId,
              itemIds: [itemId],
              name: columnName,
            },
          }),
        };
        successCallback(columnsSnapshot);
      }
    });

    (getColumnsRef as jest.Mock).mockReset().mockReturnValueOnce({
      off: columnsRefOff,
      on: columnsRefOn,
    });

    itemsRefOff = jest.fn();

    itemsRefOn = jest.fn((eventType, successCallback) => {
      if (eventType === EventType.child_added) {
        const itemSnapshot = {
          val: (): Item => ({
            createdAt: Date.now(),
            createdBy: userId,
            text: itemText,
          }),
          key: itemId,
        };
        successCallback(itemSnapshot);
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

  it('renders column name', async () => {
    renderWithStore(<Columns boardId={boardId} />);
    expect(
      await screen.findByRole('heading', {
        level: 2,
        name: columnName,
      })
    ).toBeInTheDocument();
  });

  it('renders item text', async () => {
    renderWithStore(<Columns boardId={boardId} />);
    expect(await screen.findByDisplayValue(itemText)).toBeInTheDocument();
  });

  it('removes columns on unmount', async () => {
    const { unmount } = renderWithStore(<Columns boardId={boardId} />);
    expect(await screen.findAllByText(columnName)).toHaveLength(1);
    unmount();
    expect(screen.queryAllByText(columnName)).toHaveLength(0);
    expect(screen.queryAllByText('Column 1')).toHaveLength(0);
  });

  it('attaches listeners to columns and items refs', () => {
    const { unmount } = renderWithStore(<Columns boardId={boardId} />);
    expect(columnsRefOn).toBeCalledTimes(1);
    expect(itemsRefOn).toBeCalledTimes(3);

    unmount();
    expect(columnsRefOff).toBeCalledTimes(1);
    expect(itemsRefOff).toBeCalledTimes(3);
  });
});
