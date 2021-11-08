import { fireEvent, render, screen } from '@testing-library/react';

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
    render(<VerifyEmail />);
  });

  it('renders link', () => {
    expect(
      screen.getByRole('button', { name: 'Send verification email' })
    ).toBeInTheDocument();
  });

  it('sends email verification when button is clicked', () => {
    fireEvent.click(
      screen.getByRole('button', { name: 'Send verification email' })
    );
    expect(firebaseAuth.currentUser!.sendEmailVerification).toBeCalled();
    expect(screen.getByText('Email sent')).toBeInTheDocument();
  });
});

describe('logout', () => {
  beforeEach(() => {
    render(<VerifyEmail />);
  });

  it('renders button', () => {
    expect(screen.getByRole('link', { name: 'Logout' })).toBeInTheDocument();
  });
});
