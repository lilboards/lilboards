import { renderHook } from '@testing-library/react';
import { DatabaseKey } from 'src/constants';
import { updateStore, wrapper } from 'test/utils';

import { useGetBoardOrList } from './useGetBoardOrList';

describe.each([DatabaseKey.boards, DatabaseKey.lists] as const)('%s', (key) => {
  const singularKey = key.slice(0, -1);

  it(`returns undefined when ${singularKey} does not exist`, () => {
    const { result } = renderHook(() => useGetBoardOrList(key, ''), {
      wrapper,
    });
    expect(result.current).toBe(undefined);
  });

  it(`returns ${singularKey}`, () => {
    const { id, ...data } =
      key === DatabaseKey.boards
        ? updateStore.withBoard()
        : updateStore.withList();
    const { result } = renderHook(() => useGetBoardOrList(key, id), {
      wrapper,
    });
    expect(result.current).toEqual(data);
  });
});
