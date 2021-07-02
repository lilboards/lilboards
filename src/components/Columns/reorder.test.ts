import { ITEM_IDS } from '../../constants';
import { reorderArray } from '../../utils';
import { reorderColumns } from './reorder';

describe('reorderColumns', () => {
  const column = {
    created: Date.now(),
    name: '',
    updated: Date.now(),
  };

  const columnId1 = 'column1';
  const columnId2 = 'column2';
  const itemIds = ['item1', 'item2', 'item3'];

  const columns = {
    [columnId1]: {
      ...column,
      [ITEM_IDS]: itemIds,
    },
  };

  it('does not throw when columns is empty', () => {
    const droppableId = columnId1;
    const columns = {};
    const source = {
      droppableId,
      index: 0,
    };
    const destination = {
      droppableId,
      index: 0,
    };
    expect(reorderColumns(columns, source, destination)).toEqual({
      [columnId1]: [],
    });
  });

  it('does not throw when column itemIds is missing', () => {
    const droppableId = columnId1;
    const columns = {
      [columnId1]: column,
    };
    const source = {
      droppableId,
      index: 0,
    };
    const destination = {
      droppableId,
      index: 0,
    };
    expect(reorderColumns(columns, source, destination)).toEqual({
      [columnId1]: [],
    });
  });

  describe('dropped in the same column', () => {
    const droppableId = columnId1;

    it('does nothing when the index is unchanged', () => {
      itemIds.forEach((_, index) => {
        const source = {
          droppableId,
          index,
        };
        const destination = source;
        expect(reorderColumns(columns, source, destination)).toEqual({
          [columnId1]: itemIds,
        });
      });
    });

    it('reorders items', () => {
      const source = {
        droppableId,
        index: 1,
      };
      const destination = {
        droppableId,
        index: 0,
      };
      expect(reorderColumns(columns, source, destination)).toEqual({
        [columnId1]: reorderArray(itemIds, source.index, destination.index),
      });
    });
  });

  describe('dropped in a different column', () => {
    it('moves item from one column to another', () => {
      const source = {
        droppableId: columnId1,
        index: 0,
      };
      const destination = {
        droppableId: columnId2,
        index: 0,
      };
      expect(reorderColumns(columns, source, destination)).toEqual({
        [columnId1]: itemIds.slice(1, 3),
        [columnId2]: itemIds.slice(0, 1),
      });
    });
  });
});
