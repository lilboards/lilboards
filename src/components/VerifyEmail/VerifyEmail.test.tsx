import { fireEvent, screen } from '@testing-library/react';

import { sendEmailVerification } from '../../firebase';
import { renderWithContext } from '../../utils/test';
import VerifyEmail from './VerifyEmail';

jest.mock('../../firebase', () => ({
  sendEmailVerification: jest.fn(),
}));

describe('send verification email', () => {
  it('renders link', () => {
    renderWithContext(<VerifyEmail />);
    expect(
      screen.getByRole('button', { name: 'Send verification email' })
    ).toBeInTheDocument();
  });

  it('sends email verification when button is clicked', () => {
    renderWithContext(<VerifyEmail />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Send verification email' })
    );
    expect(sendEmailVerification).toBeCalled();
    expect(screen.getByText('Email sent')).toBeInTheDocument();
  });
});

describe('logout', () => {
  it('renders button', () => {
    renderWithContext(<VerifyEmail />);
    expect(screen.getByRole('link', { name: 'Logout' })).toBeInTheDocument();
  });
});
