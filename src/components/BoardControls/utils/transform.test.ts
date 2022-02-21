import { transformToMarkdown, transformToRows } from './transform';

describe('transformToRows', () => {
  it('transforms empty columns to empty items', () => {
    expect(transformToRows({}, {})).toEqual([]);
  });

  it('transforms column with no items', () => {
    expect(
      transformToRows(
        {
          column1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            itemIds: [],
            name: 'Column Name',
          },
        },
        {}
      )
    ).toEqual([['Column Name']]);
  });

  it('transforms columns with no items', () => {
    expect(
      transformToRows(
        {
          column1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            name: 'Column Name 1',
          },
          column2: {
            createdAt: Date.now(),
            createdBy: 'user1',
            itemIds: [],
            name: 'Column Name 2',
          },
        },
        {}
      )
    ).toEqual([['Column Name 1', 'Column Name 2']]);
  });

  it('transforms column with item', () => {
    expect(
      transformToRows(
        {
          column1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            itemIds: ['item1'],
            name: 'Column Name',
          },
        },
        {
          item1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 1',
          },
        }
      )
    ).toEqual([['Column Name'], ['Item 1']]);
  });

  it('transforms column with items', () => {
    expect(
      transformToRows(
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
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 1',
          },
          item2: {
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 2',
          },
        }
      )
    ).toEqual([['Column Name'], ['Item 1'], ['Item 2']]);
  });

  it('transforms columns with items', () => {
    expect(
      transformToRows(
        {
          column1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            itemIds: ['item1'],
            name: 'Column 1',
          },
          column2: {
            createdAt: Date.now(),
            createdBy: 'user1',
            itemIds: ['item2', 'item3'],
            name: 'Column 2',
          },
        },
        {
          item1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 1',
          },
          item2: {
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 2',
          },
          item3: {
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 3',
          },
        }
      )
    ).toEqual([
      ['Column 1', 'Column 2'],
      ['Item 1', 'Item 2'],
      [undefined, 'Item 3'],
    ]);
  });
});

describe('transformToMarkdown', () => {
  it('transforms empty columns to empty string', () => {
    expect(transformToMarkdown({}, {})).toBe('');
  });

  it('transforms column with no items', () => {
    expect(
      transformToMarkdown(
        {
          column1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            itemIds: [],
            name: 'Column Name',
          },
        },
        {}
      )
    ).toMatchInlineSnapshot(`
      "| Column Name |
      | --- |
      "
    `);
  });

  it('transforms columns with no items', () => {
    expect(
      transformToMarkdown(
        {
          column1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            name: 'Column Name 1',
          },
          column2: {
            createdAt: Date.now(),
            createdBy: 'user1',
            itemIds: [],
            name: 'Column Name 2',
          },
        },
        {}
      )
    ).toMatchInlineSnapshot(`
      "| Column Name 1 | Column Name 2 |
      | --- | --- |
      "
    `);
  });

  it('transforms column with item', () => {
    expect(
      transformToMarkdown(
        {
          column1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            itemIds: ['item1'],
            name: 'Column Name',
          },
        },
        {
          item1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 1',
          },
        }
      )
    ).toMatchInlineSnapshot(`
      "| Column Name |
      | --- |
      | Item 1 |
      "
    `);
  });

  it('transforms column with items', () => {
    expect(
      transformToMarkdown(
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
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 1',
          },
          item2: {
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 2',
          },
        }
      )
    ).toMatchInlineSnapshot(`
      "| Column Name |
      | --- |
      | Item 1 |
      | Item 2 |
      "
    `);
  });

  it('transforms columns with items', () => {
    expect(
      transformToMarkdown(
        {
          column1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            itemIds: ['item1'],
            name: 'Column 1',
          },
          column2: {
            createdAt: Date.now(),
            createdBy: 'user1',
            itemIds: ['item2', 'item3'],
            name: 'Column 2',
          },
        },
        {
          item1: {
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 1',
          },
          item2: {
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 2',
          },
          item3: {
            createdAt: Date.now(),
            createdBy: 'user1',
            text: 'Item 3',
          },
        }
      )
    ).toMatchInlineSnapshot(`
      "| Column 1 | Column 2 |
      | --- | --- |
      | Item 1 | Item 2 |
      |  | Item 3 |
      "
    `);
  });
});
