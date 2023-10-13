/**
 * Clean the URL by removing the query string and hash.
 * @returns {object} an object of the initial URL and the cleaned URL.
 */
export default function cleanUrl(): { originalUrl: string; cleanedUrl: string } {
  const { location, history } = window;

  const { origin, pathname, href } = location;

  // Remove the query string and hash.
  history.replaceState({}, '', origin + pathname);

  return {
    originalUrl: href,
    cleanedUrl: origin + pathname,
  };
}
