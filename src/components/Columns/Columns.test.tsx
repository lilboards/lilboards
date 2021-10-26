import { screen } from '@testing-library/react';

import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../constants/test';
import { getColumnsRef, getItemsRef, getLikesRef } from '../../firebase';
import { Column, EventType, Item, Likes } from '../../types';
import { renderWithContext, updateStore } from '../../utils/test';
import Columns from './Columns';

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
  renderWithContext(<Columns boardId={board.id} />);
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
    columnsRefOn = jest.fn((eventType, callback) => {
      if (eventType === EventType.child_added) {
        const columnSnapshot = {
          key: columnId,
          val: (): Column => ({
            createdAt: Date.now(),
            createdBy: userId,
            itemIds: [itemId],
            name: columnName,
          }),
        };
        callback(columnSnapshot);
      }
    });

    (getColumnsRef as jest.Mock).mockReset().mockReturnValueOnce({
      on: columnsRefOn,
      off: (columnsRefOff = jest.fn()),
    });

    itemsRefOn = jest.fn((eventType, callback) => {
      if (eventType === EventType.child_added) {
        const itemSnapshot = {
          key: itemId,
          val: (): Item => ({
            createdAt: Date.now(),
            createdBy: userId,
            text: itemText,
          }),
        };
        callback(itemSnapshot);
      }
    });

    (getItemsRef as jest.Mock).mockReset().mockReturnValueOnce({
      on: itemsRefOn,
      off: (itemsRefOff = jest.fn()),
    });

    likesRefOn = jest.fn((eventType, callback) => {
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
        callback(likesSnapshot);
      }
    });

    (getLikesRef as jest.Mock).mockReset().mockReturnValueOnce({
      on: likesRefOn,
      off: (likesRefOff = jest.fn()),
    });
  });

  it('loads columns', async () => {
    renderWithContext(<Columns boardId={boardId} />);
    expect(await screen.findAllByRole('textbox')).toHaveLength(1);
  });

  it('renders column name', async () => {
    renderWithContext(<Columns boardId={boardId} />);
    expect(
      await screen.findByRole('heading', {
        level: 2,
        name: columnName,
      })
    ).toBeInTheDocument();
  });

  it('renders item text', async () => {
    renderWithContext(<Columns boardId={boardId} />);
    expect(await screen.findByDisplayValue(itemText)).toBeInTheDocument();
  });

  it('renders liked item', async () => {
    updateStore.withUser();
    renderWithContext(<Columns boardId={boardId} />);
    expect(await screen.findByLabelText(/1 like for item/)).toBeInTheDocument();
  });

  it('removes columns on unmount', async () => {
    const { unmount } = renderWithContext(<Columns boardId={boardId} />);
    expect(await screen.findAllByText(columnName)).toHaveLength(1);
    unmount();
    expect(screen.queryAllByText(columnName)).toHaveLength(0);
    expect(screen.queryAllByText('Column 1')).toHaveLength(0);
  });

  it('attaches ref listeners', () => {
    const eventTypes = [
      EventType.child_added,
      EventType.child_changed,
      EventType.child_removed,
    ];

    const { unmount } = renderWithContext(<Columns boardId={boardId} />);
    [columnsRefOn, itemsRefOn].forEach((refOn) => {
      expect(refOn).toBeCalledTimes(eventTypes.length);
      eventTypes.forEach((eventType) => {
        expect(refOn).toBeCalledWith(eventType, expect.any(Function));
      });
    });
    expect(likesRefOn).toBeCalledTimes(1);
    expect(likesRefOn).toBeCalledWith(EventType.value, expect.any(Function));

    unmount();
    [columnsRefOff, itemsRefOff].forEach((refOff) => {
      expect(refOff).toBeCalledTimes(eventTypes.length);
      eventTypes.forEach((eventType) => {
        expect(refOff).toBeCalledWith(eventType);
      });
    });
    expect(likesRefOff).toBeCalledTimes(1);
    expect(likesRefOff).toBeCalledWith(EventType.value);
  });
});
