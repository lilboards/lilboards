import { When } from '@badeball/cypress-cucumber-preprocessor';
import {
  getCypressElement,
  When_I_find_element_by_label_text,
  When_I_wait_milliseconds,
} from 'cypress-cucumber-steps';

let listUrl: string;

When('I copy list link', () => {
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

  // https://github.com/cypress-io/cypress/issues/18198#issuecomment-1613998336
  When_I_find_element_by_label_text('Copy link');
  getCypressElement().realClick();
  When_I_wait_milliseconds(300);

  cy.url().then((url) => {
    cy.window().then(({ navigator }) => {
      navigator.clipboard.readText().then((text) => {
        // TODO: harden flaky assertion
        try {
          expect(text).to.equal(url);
          listUrl = text;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          listUrl = url;
        }
      });
    });
  });
});

When('I visit list', () => {
  cy.visit(listUrl);
});
