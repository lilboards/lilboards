import { logEvent } from 'src/firebase';

export async function copyLinkToClipboard() {
  const link = window.location.origin + window.location.pathname;
  await navigator.clipboard.writeText(link);
  logEvent('copy', { link });
}
