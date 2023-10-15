import type { FsCleanUrlSettings } from '../utils/types';

/**
 * Clean the URL by removing the query string and hash.
 * @returns {object} an object of the initial URL and the cleaned URL.
 */
export default function cleanUrl(globalSettings: FsCleanUrlSettings): {
  originalUrl: string;
  cleanedUrl: string;
} {
  const { location, history } = window;

  const { href } = location;

  const url = new URL(href);

  if (Object.keys(globalSettings).length === 0) {
    url.search = '';
    url.hash = '';
  } else {
    // Only remove query string if it's enabled.
    if (globalSettings.query === 'enable') {
      url.search = '';
    }

    // Only remove hash if it's enabled.
    if (globalSettings.hash === 'enable') {
      url.hash = '';
    }
  }

  // Remove the query string and hash.
  history.replaceState({}, '', url.toString());

  return {
    originalUrl: href,
    cleanedUrl: url.toString(),
  };
}
