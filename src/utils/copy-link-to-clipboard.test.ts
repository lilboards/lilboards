import { copyLinkToClipboard } from './copy-link-to-clipboard';

const { clipboard } = navigator;
const writeText = jest.fn();

beforeAll(() => {
  (navigator as any).clipboard = { writeText };
});

beforeEach(() => {
  writeText.mockClear();
});

afterAll(() => {
  (navigator as any).clipboard = clipboard;
});

it('copies link to clipboard', () => {
  copyLinkToClipboard();
  expect(writeText).toHaveBeenCalledTimes(1);
  expect(writeText).toHaveBeenCalledWith(window.location.href);
});
