import type { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { Given } from '@badeball/cypress-cucumber-preprocessor';

import account from '../../fixtures/account.json';

Given('I login', (table?: DataTable) => {
  let [{ email, password }] = table?.hashes() || [account];
  cy.visit('/login');
  cy.contains('button', 'Sign in with email').click();
  cy.focused().type(email);
  cy.contains('button', 'Next').click();
  cy.focused().type(password);
  cy.contains('button', 'Sign In').click();
});
