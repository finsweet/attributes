/**
 * Stores for the calendar events
 * @type {Object}
 * @property {Map<string, Google>} google The Google calendar events store.
 * @property {Map<string, Outlook>} outlook The Outlook calendar events store.
 * @property {Map<string, Ics>} apple The Apple calendar events store.
 */
export const stores = {
  google: new Map(),
  outlook: new Map(),
  apple: new Map(),
};
