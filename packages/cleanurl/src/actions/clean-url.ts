import { SETTINGS } from '../utils/constants';
import type { FsCleanUrlSettings } from '../utils/types';

/**
 * Cleans the current window URL by optionally removing the query string and hash based on provided settings.
 *
 * @param {FsCleanUrlSettings} globalSettings - Object that contains settings on whether to remove the query and/or hash
 * @returns An object containing the initial URL and the cleaned URL.
 */
export default function cleanUrl(globalSettings: FsCleanUrlSettings): { originalUrl: string; cleanedUrl: string } {
  const { location, history } = window;
  const { href } = location;

  // Clone URL for manipulation
  const url = new URL(href);

  // Destructure settings for readability
  const { query, hash } = globalSettings;

  // If no settings are provided, clean both query and hash and return early
  if (Object.keys(globalSettings).length === 0) {
    url.search = '';
    url.hash = '';
    history.replaceState({}, '', url.toString());
    return { originalUrl: href, cleanedUrl: url.toString() };
  }

  // Conditionally remove query and hash based on settings
  if (query === SETTINGS.query.values.enable) {
    url.search = '';
  }
  if (hash === SETTINGS.hash.values.enable) {
    url.hash = '';
  }

  // Update the browser history with the cleaned URL
  history.replaceState({}, '', url.toString());

  return {
    originalUrl: href,
    cleanedUrl: url.toString(),
  };
}
