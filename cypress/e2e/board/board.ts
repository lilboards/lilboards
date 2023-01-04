import { When } from '@badeball/cypress-cucumber-preprocessor';

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
    })
  );

  cy.get('[aria-label="Copy board link"]').click();

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
