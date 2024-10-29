import type { Column, Item } from 'src/types';

import {
  transformToCSV,
  transformToMarkdown,
  transformToRows,
} from './transform';

const column: Column = {
  createdAt: Date.now(),
  createdBy: 'user1',
  name: '',
} as const;

const item: Item = {
  createdAt: Date.now(),
  createdBy: 'user1',
  text: '',
} as const;

const transforms = [transformToCSV, transformToMarkdown, transformToRows];

describe.each(transforms)('%p', (transform) => {
  it('transforms empty columns', () => {
    expect(transform({}, {})).toMatchSnapshot();
  });

  it('transforms columns with no name', () => {
    expect(
      transform(
        {
          column1: column,
          column2: column,
        },
        {},
      ),
    ).toMatchSnapshot();
  });

  it('transforms column with no items', () => {
    expect(
      transform(
        {
          column1: {
            ...column,
            name: 'Column Name',
          },
        },
        {},
      ),
    ).toMatchSnapshot();
  });

  it('transforms columns with no items', () => {
    expect(
      transform(
        {
          column1: {
            ...column,
            name: 'Column Name 1',
          },
          column2: {
            ...column,
            itemIds: [],
            name: 'Column Name 2',
          },
        },
        {},
      ),
    ).toMatchSnapshot();
  });

  it('transforms column with item', () => {
    expect(
      transform(
        {
          column1: {
            ...column,
            itemIds: ['item1'],
            name: 'Column Name',
          },
        },
        {
          item1: {
            ...item,
            text: 'Item 1',
          },
        },
      ),
    ).toMatchSnapshot();
  });

  it('transforms column with items', () => {
    expect(
      transform(
        {
          column1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            itemIds: ['item1', 'item2'],
            name: 'Column Name',
          },
        },
        {
          item1: {
            ...item,
            text: 'Item 1',
          },
          item2: {
            ...item,
            text: 'Item 2',
          },
        },
      ),
    ).toMatchSnapshot();
  });

  it('transforms columns with items', () => {
    expect(
      transform(
        {
          column1: {
            ...column,
            itemIds: ['item1'],
            name: 'Column 1',
          },
          column2: {
            ...column,
            itemIds: ['item2', 'item3'],
            name: 'Column 2',
          },
        },
        {
          item1: {
            ...item,
            text: 'Item 1',
          },
          item2: {
            ...item,
            text: 'Item 2',
          },
          item3: {
            ...item,
            text: 'Item 3',
          },
        },
      ),
    ).toMatchSnapshot();
  });

  it('transforms column with item with newlines', () => {
    expect(
      transform(
        {
          column1: {
            ...column,
            itemIds: ['item1'],
            name: 'Column Name',
          },
        },
        {
          item1: {
            ...item,
            text: 'Item\n\n1',
          },
        },
      ),
    ).toMatchSnapshot();
  });
});
