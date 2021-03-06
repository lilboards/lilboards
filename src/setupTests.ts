// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { BOARD_TEST_ID as boardId } from './constants/test';
import { removeBoard } from './firebase';
import { resetStore } from './utils/test';

afterEach(() => {
  resetStore();
});

afterAll(() => {
  removeBoard(boardId);
});
