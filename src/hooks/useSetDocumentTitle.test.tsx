import { renderHook } from '@testing-library/react';

import { useSetDocumentTitle } from './useSetDocumentTitle';

const { title } = document;

afterAll(() => {
  document.title = title;
});

it('sets document title', () => {
  const title = 'Document Title';
  const { result } = renderHook(() => useSetDocumentTitle(title));
  expect(result.current).toBe(undefined);
  expect(document.title).toBe(title);
});
