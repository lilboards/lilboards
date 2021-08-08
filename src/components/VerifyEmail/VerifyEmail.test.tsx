import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test';
import { firebaseAuth } from '../../firebase';
import VerifyEmail from './VerifyEmail';

jest.mock('../../firebase', () => ({
  firebaseAuth: {
    currentUser: {
      sendEmailVerification: jest.fn(),
    },
  },
}));

describe('send verification email', () => {
  beforeEach(() => {
    renderWithStore(<VerifyEmail />);
  });

  it('renders button', () => {
    expect(
      screen.getByRole('button', { name: 'Send verification email' })
    ).toBeInTheDocument();
  });

  it('sends email verification when button is clicked', () => {
    fireEvent.click(
      screen.getByRole('button', { name: 'Send verification email' })
    );
    expect(firebaseAuth.currentUser!.sendEmailVerification).toBeCalled();
  });
});

describe('reload page', () => {
  beforeEach(() => {
    renderWithStore(<VerifyEmail />);
  });

  it('renders button', () => {
    expect(
      screen.getByRole('button', { name: 'Reload page' })
    ).toBeInTheDocument();
  });
});
