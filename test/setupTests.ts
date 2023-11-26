// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { BOARD_TEST_ID as boardId } from '../src/constants/test';
import { removeBoard } from '../src/firebase';
import { resetStore } from '../src/utils/test';

jest.mock('firebase/database', () => ({
  ...jest.requireActual('firebase/database'),
  onChildAdded: jest.fn(),
  onChildChanged: jest.fn(),
  onChildRemoved: jest.fn(),
  onValue: jest.fn(),
}));

jest.mock('../src/config');

afterEach(() => {
  resetStore();
});

afterAll(() => {
  removeBoard(boardId);
});
