import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { removeBoard } from 'src/firebase';
import { boardId } from 'test/constants';
import { afterAll, afterEach, vi } from 'vitest';

import { resetStore } from './utils';

vi.mock('firebase/database', async (importOriginal) => ({
  ...(await importOriginal<typeof import('firebase/database')>()),
  onChildAdded: vi.fn(),
  onChildChanged: vi.fn(),
  onChildRemoved: vi.fn(),
  onValue: vi.fn(),
}));

vi.mock('src/config');

afterEach(() => {
  cleanup();
  resetStore();
});

afterAll(() => {
  removeBoard(boardId);
});
