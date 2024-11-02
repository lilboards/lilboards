import { renderHook } from '@testing-library/react';
import { updateStore, wrapper } from 'test/utils';

import { useGetUserPhotoURL } from './useGetUserPhotoURL';

it('returns null when user does not exist', () => {
  const { result } = renderHook(() => useGetUserPhotoURL(), { wrapper });
  expect(result.current).toBe(null);
});

it('returns user photo URL', () => {
  const photoURL = 'https://example.com/photo.png';
  updateStore.withUser(undefined, { photoURL });
  const { result } = renderHook(() => useGetUserPhotoURL(), { wrapper });
  expect(result.current).toBe(photoURL);
});
