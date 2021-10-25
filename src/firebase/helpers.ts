/* istanbul ignore file */
import type firebase from 'firebase';

/**
 * Gets Firebase analytics.
 *
 * @param app - The Firebase app.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const getAnalytics = (app: firebase.app.App) => app.analytics();

/**
 * Gets Firebase auth.
 *
 * @param app - The Firebase app.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const getAuth = (app: firebase.app.App) => app.auth();

/**
 * Gets Firebase database.
 *
 * @param app - The Firebase app.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const getDatabase = (app: firebase.app.App) => app.database();

/**
 * Pushes Firebase database reference with value.
 *
 * @param ref - The Firebase database reference.
 * @param value - The value.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const push = (ref: firebase.database.Reference, value?: any) =>
  ref.push(value);

/**
 * Gets Firebase database child reference.
 *
 * @param database - The Firebase database reference.
 * @param path - The path.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const child = (ref: firebase.database.Reference, path: string) =>
  ref.child(path);

/**
 * Gets Firebase database reference value.
 *
 * @param ref - The Firebase database reference.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const get = (ref: firebase.database.Reference) => ref.get();

/**
 * Gets Firebase database reference.
 *
 * @param database - The Firebase database.
 * @param path - The path.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const ref = (database: firebase.database.Database, path?: string) =>
  database.ref(path);

/**
 * Removes Firebase database reference.
 *
 * @param ref - The Firebase database reference.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const remove = (ref: firebase.database.Reference) => ref.remove();

/**
 * Runs Firebase database reference transaction.
 *
 * @param ref - The Firebase database reference.
 * @param transactionUpdate - The transaction update callback.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const runTransaction = (
  ref: firebase.database.Reference,
  transanctionUpdate: (a: any) => any
) => ref.transaction(transanctionUpdate);

/**
 * Sets Firebase database reference with value.
 *
 * @param ref - The Firebase database reference.
 * @param value - The value.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const set = (ref: firebase.database.Reference, value: any) =>
  ref.set(value);

/**
 * Updates Firebase database reference with values.
 *
 * @param ref - The Firebase database reference.
 * @param values - The values.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const update = (ref: firebase.database.Reference, values: Object) =>
  ref.update(values);
