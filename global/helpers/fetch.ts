/**
 * Fetches and parses a page.
 * @param url The URL of the page.
 *
 * @returns The page's {@link Document}.
 */
export const fetchPageDocument = async (url: string) => {
  const response = await fetch(url);
  const rawPage = await response.text();

  const page = new DOMParser().parseFromString(rawPage, 'text/html');

  return page;
};
