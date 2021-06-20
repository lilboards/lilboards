// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { BOARD_TEST_ID } from './constants/test';
import { getBoardRef } from './firebase';
import { resetStore } from './utils/test';

afterEach(() => {
  resetStore();
});

afterAll(() => {
  getBoardRef(BOARD_TEST_ID).remove();
});
