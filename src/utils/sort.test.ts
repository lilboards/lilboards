import { SortOrder } from '../types';
import { sort } from './sort';

const id = 'id';
const key = 'key';

describe('sort', () => {
  it('does not mutate objects', () => {
    const objects = [{ [key]: 2 }, { [key]: 1 }];
    const result = sort(objects, key, 'invalid' as unknown as SortOrder);
    expect(result).not.toBe(objects);
    expect(result).toEqual(objects);
  });

  it(`sorts objects by key "${id}" and order ascending`, () => {
    const objects = [{ [id]: 3 }, { [id]: 2 }, { [id]: 1 }];
    expect(sort(objects, id, SortOrder.Ascending)).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": 1,
        },
        Object {
          "id": 2,
        },
        Object {
          "id": 3,
        },
      ]
    `);
  });

  it(`sorts objects by key "${key}" and order descending`, () => {
    const objects = [{ [key]: 1 }, { [key]: 2 }, { [key]: 3 }];
    expect(sort(objects, key, SortOrder.Descending)).toMatchInlineSnapshot(`
      Array [
        Object {
          "key": 3,
        },
        Object {
          "key": 2,
        },
        Object {
          "key": 1,
        },
      ]
    `);
  });
});
