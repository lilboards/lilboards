import { When } from '@badeball/cypress-cucumber-preprocessor';
import {
  When_I_double_click,
  When_I_find_element_by_label_text,
  When_I_focus,
} from 'cypress-cucumber-steps';

let boardUrl: string;

When('I copy board link', () => {
  // https://github.com/kamranayub/cypress-browser-permissions/issues/42#issuecomment-1236418556
  cy.wrap(
    Cypress.automation('remote:debugger:protocol', {
      command: 'Browser.grantPermissions',
      params: {
        permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
        origin: window.location.origin,
      },
    }),
  );

  // https://github.com/cypress-io/cypress/issues/18198#issuecomment-1867783412
  When_I_find_element_by_label_text('Copy board link');
  When_I_focus();
  When_I_double_click();

  cy.url().then((url) => {
    cy.window().then(({ navigator }) => {
      navigator.clipboard.readText().then((text) => {
        expect(text).to.equal(url);
        boardUrl = url;
      });
    });
  });
});

When('I visit board', () => {
  cy.visit(boardUrl);
});
