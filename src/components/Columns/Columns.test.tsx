import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import { getColumnsRef, getItemsRef, getLikesRef } from '../../firebase';
import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../constants/test';
import Columns from './Columns';

import { Columns as ColumnsState, EventType, Item, Likes } from '../../types';

jest.mock('../../firebase', () => ({
  getColumnsRef: jest.fn(),
  getItemsRef: jest.fn(),
  getLikesRef: jest.fn(),
}));

beforeEach(() => {
  (getColumnsRef as jest.Mock).mockReturnValueOnce({
    on: jest.fn(),
    off: jest.fn(),
  });
  (getItemsRef as jest.Mock).mockReturnValueOnce({
    on: jest.fn(),
    off: jest.fn(),
  });
  (getLikesRef as jest.Mock).mockReturnValueOnce({
    on: jest.fn(),
    off: jest.fn(),
  });
});

it('renders column', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  renderWithStore(<Columns boardId={board.id} />);
  expect(screen.getByText(column.name)).toBeInTheDocument();
});

describe('mount', () => {
  let columnsRefOn: jest.Mock;
  let columnsRefOff: jest.Mock;

  let itemsRefOn: jest.Mock;
  let itemsRefOff: jest.Mock;

  let likesRefOn: jest.Mock;
  let likesRefOff: jest.Mock;

  const columnName = 'My Column';
  const itemText = 'My Item';

  beforeEach(() => {
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
    columnsRefOff = jest.fn();
    (getColumnsRef as jest.Mock).mockReset().mockReturnValueOnce({
      on: columnsRefOn,
      off: columnsRefOff,
    });

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
    itemsRefOff = jest.fn();
    (getItemsRef as jest.Mock).mockReset().mockReturnValueOnce({
      on: itemsRefOn,
      off: itemsRefOff,
    });

    likesRefOn = jest.fn((eventType, successCallback) => {
      if (eventType === EventType.value) {
        const likesSnapshot = {
          val: (): Likes => ({
            items: {
              [itemId]: {
                [userId]: true,
              },
            },
          }),
        };
        successCallback(likesSnapshot);
      }
    });
    likesRefOff = jest.fn();
    (getLikesRef as jest.Mock).mockReset().mockReturnValueOnce({
      on: likesRefOn,
      off: likesRefOff,
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

  it('renders liked item', async () => {
    updateStore.withUser();
    renderWithStore(<Columns boardId={boardId} />);
    expect(await screen.findByLabelText(/1 like for item/)).toBeInTheDocument();
  });

  it('removes columns on unmount', async () => {
    const { unmount } = renderWithStore(<Columns boardId={boardId} />);
    expect(await screen.findAllByText(columnName)).toHaveLength(1);
    unmount();
    expect(screen.queryAllByText(columnName)).toHaveLength(0);
    expect(screen.queryAllByText('Column 1')).toHaveLength(0);
  });

  it('attaches ref listeners', () => {
    const { unmount } = renderWithStore(<Columns boardId={boardId} />);
    expect(columnsRefOn).toBeCalledTimes(1);
    expect(itemsRefOn).toBeCalledTimes(3);
    expect(likesRefOn).toBeCalledTimes(1);

    unmount();
    expect(columnsRefOff).toBeCalledTimes(1);
    expect(itemsRefOff).toBeCalledTimes(3);
    expect(likesRefOff).toBeCalledTimes(1);
  });
});
