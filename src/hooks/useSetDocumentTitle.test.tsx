import { render } from '@testing-library/react';

import { useSetDocumentTitle } from './useSetDocumentTitle';

const { title } = document;

afterAll(() => {
  document.title = title;
});

it('sets document title', () => {
  const title = 'Document Title';
  function TestComponent() {
    useSetDocumentTitle(title);
    return null;
  }
  render(<TestComponent />);
  expect(document.title).toBe(title);
});
