import { screen } from '@testing-library/react';
import {
  BOARD_TEST_ID as boardId,
  USER_TEST_EMAIL as userEmail,
  USER_TEST_ID as userId,
} from '../../constants/test';
import { firebaseAuth } from '../../firebase';
import { history, renderWithStore, updateStore } from '../../utils/test';
import BoardAuth from './BoardAuth';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
  firebaseAuth: {
    onAuthStateChanged: jest.fn(),
    signInAnonymously: jest.fn(),
  },
}));

jest.mock('./Board', () => () => <>Board</>);

beforeEach(() => {
  (firebaseAuth.onAuthStateChanged as jest.Mock).mockImplementationOnce(
    (callback) => {
      const user = {
        email: userEmail,
        uid: userId,
      };
      callback(user);
    }
  );
});

it('renders nothing when user is not signed in', async () => {
  const { baseElement } = renderWithStore(<BoardAuth />);
  await screen.findAllByText('');
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('redirects to "/404" when props.boardId is falsey', async () => {
  renderWithStore(<BoardAuth boardId="" />);
  await screen.findAllByText('');
  expect(history.location.pathname).toBe('/404');
});

it('renders board when user is signed in', async () => {
  const board = updateStore.withBoard();
  renderWithStore(<BoardAuth boardId={board.id} />);
  expect(await screen.findByText('Board')).toBeInTheDocument();
});

describe('with anonymous user', () => {
  beforeEach(() => {
    (firebaseAuth.onAuthStateChanged as jest.Mock)
      .mockReset()
      .mockImplementationOnce((callback) => {
        const user = null;
        callback(user);
      });
  });

  it('signs user in anonymously', async () => {
    renderWithStore(<BoardAuth boardId={boardId} />);
    expect(firebaseAuth.signInAnonymously).toBeCalledTimes(1);
  });
});
