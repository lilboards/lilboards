import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I verify email', () => {
  const firebaseDebugLog = 'firebase-debug.log';

  cy.readFile(firebaseDebugLog, 'utf8').then((log: string) => {
    const match = log.match(
      /(http:\/\/127.0.0.1:9099\/emulator\/action\?mode=verifyEmail.+?apiKey=fake-api-key)/g,
    );
    const verificationLink = match?.pop();

    if (!verificationLink) {
      throw new Error(
        `Email verification link not found in ${firebaseDebugLog}`,
      );
    }

    cy.log('Email verification link found', verificationLink);
    cy.request(verificationLink);
  });
});
