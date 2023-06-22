import { useEffect } from 'react';

/**
 * Set document title.
 */
export function useSetDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title;
  });
}
