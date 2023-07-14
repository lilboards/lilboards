import type { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { Given } from '@badeball/cypress-cucumber-preprocessor';

import account from '../../fixtures/account.json';
import {
  getFirebaseAccountUrl,
  getFirebaseProjectUrl,
} from '../../support/utils';

Given('I create account', (table?: DataTable) => {
  const accounts = table?.hashes() || [account];

  accounts.forEach(({ email, password }) => {
    cy.request('POST', getFirebaseAccountUrl('signUp'), {
      email,
      password,
      returnSecureToken: true,
    })
      .then((response) => {
        const { idToken } = response.body;

        return cy.request('POST', getFirebaseAccountUrl('sendOobCode'), {
          requestType: 'VERIFY_EMAIL',
          idToken,
        });
      })
      .then(() => {
        return cy.request(getFirebaseProjectUrl('oobCodes'));
      })
      .then((response) => {
        const { oobCodes } = response.body;

        cy.request('POST', getFirebaseAccountUrl('update'), {
          oobCode: oobCodes.find(
            (code: {
              email: string;
              oobCode: string;
              oobLink: string;
              requestType: string;
            }) => code.email === email,
          ).oobCode,
        });
      });
  });
});
