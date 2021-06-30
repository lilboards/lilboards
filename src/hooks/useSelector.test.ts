import {
  shallowEqual,
  useSelector as useReactReduxSelector,
} from 'react-redux';
import { useSelector } from './useSelector';

jest.mock('react-redux', () => ({
  shallowEqual: jest.fn(),
  useSelector: jest.fn(),
}));

beforeEach(() => {
  (shallowEqual as jest.Mock).mockClear();
  (useReactReduxSelector as jest.Mock).mockClear();
});

it('wraps react-redux useSelector with shallowEqual', () => {
  const selector = jest.fn();
  useSelector(selector);
  expect(useReactReduxSelector).toBeCalledTimes(1);
  expect(useReactReduxSelector).toBeCalledWith(selector, shallowEqual);
});
