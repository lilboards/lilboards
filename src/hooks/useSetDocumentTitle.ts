import { useEffect } from 'react';

/**
 * Set document title hook.
 */
export function useSetDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  });
}
