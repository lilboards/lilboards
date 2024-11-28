import { renderHook } from '@testing-library/react';
import { DatabaseKey } from 'src/constants';
import { updateStore, wrapper } from 'test/utils';

import { useBoardOrList } from './useBoardOrList';

describe.each([DatabaseKey.boards, DatabaseKey.lists] as const)('%s', (key) => {
  const singularKey = key.slice(0, -1);

  it(`returns undefined when ${singularKey} does not exist`, () => {
    const { result } = renderHook(() => useBoardOrList(key, ''), {
      wrapper,
    });
    expect(result.current).toBe(undefined);
  });

  it(`returns ${singularKey}`, () => {
    const { id, ...data } =
      key === DatabaseKey.boards
        ? updateStore.withBoard()
        : updateStore.withList();
    const { result } = renderHook(() => useBoardOrList(key, id), {
      wrapper,
    });
    expect(result.current).toEqual(data);
  });
});
