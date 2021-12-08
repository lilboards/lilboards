import { BOARD_TEST_ID } from '../constants/test';
import { useSelector } from '.';
import { DEFAULT_MAX_LIKES, useMaxLikes } from './useMaxLikes';

jest.mock('.', () => ({
  useSelector: jest.fn(),
}));

describe('when boards are empty', () => {
  const state = {
    boards: {},
  };

  it('returns default max likes', () => {
    (useSelector as jest.Mock).mockImplementationOnce((callback) =>
      callback(state)
    );
    expect(useMaxLikes(BOARD_TEST_ID)).toBe(DEFAULT_MAX_LIKES);
  });
});

describe('when board is undefined', () => {
  const state = {
    boards: {
      [`${BOARD_TEST_ID}2`]: {
        maxLikes: DEFAULT_MAX_LIKES - 1,
      },
    },
  };

  it('returns default max likes', () => {
    (useSelector as jest.Mock).mockImplementationOnce((callback) =>
      callback(state)
    );
    expect(useMaxLikes(BOARD_TEST_ID)).toBe(DEFAULT_MAX_LIKES);
  });
});

describe('when maxLikes is undefined', () => {
  const maxLikes = undefined;
  const state = {
    boards: {
      [BOARD_TEST_ID]: {
        maxLikes,
      },
    },
  };

  it('returns default max likes', () => {
    (useSelector as jest.Mock).mockImplementationOnce((callback) =>
      callback(state)
    );
    expect(useMaxLikes(BOARD_TEST_ID)).toBe(DEFAULT_MAX_LIKES);
  });
});

describe('when maxLikes is valid', () => {
  const maxLikes = DEFAULT_MAX_LIKES + 1;
  const state = {
    boards: {
      [BOARD_TEST_ID]: {
        maxLikes,
      },
    },
  };

  it('returns max likes', () => {
    (useSelector as jest.Mock).mockImplementationOnce((callback) =>
      callback(state)
    );
    expect(useMaxLikes(BOARD_TEST_ID)).toBe(maxLikes);
  });
});

describe('when maxLikes is 0', () => {
  const maxLikes = 0;
  const state = {
    boards: {
      [BOARD_TEST_ID]: {
        maxLikes,
      },
    },
  };

  it('returns 0', () => {
    (useSelector as jest.Mock).mockImplementationOnce((callback) =>
      callback(state)
    );
    expect(useMaxLikes(BOARD_TEST_ID)).toBe(maxLikes);
  });
});
