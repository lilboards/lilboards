export function getFirebaseAccountUrl(
  action: 'signUp' | 'sendOobCode' | 'update',
) {
  return `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:${action}?key=fake-api-key`;
}

export function getFirebaseProjectUrl(type: 'accounts' | 'oobCodes') {
  return `http://localhost:9099/emulator/v1/projects/lilboards/${type}`;
}

export function deleteFirebaseAccounts() {
  cy.request('DELETE', getFirebaseProjectUrl('accounts'));
}
