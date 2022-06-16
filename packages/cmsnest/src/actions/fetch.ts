const domParser = new DOMParser();
const cacheStore: Map<string, Promise<Document>> = new Map();

/**
 * Fetches and caches a CMS Template Page.
 * @param href The href of the Template Page.
 *
 * @returns The parsed page.
 */
export const fetchTemplatePage = async (href: string) => {
  try {
    const cachedPage = cacheStore.get(href);
    if (cachedPage) return cachedPage;

    const pagePromise = new Promise<Document>(async (resolve) => {
      const response = await fetch(href);
      const rawPage = await response.text();

      const page = domParser.parseFromString(rawPage, 'text/html');

      resolve(page);
    });

    cacheStore.set(href, pagePromise);

    return pagePromise;
  } catch (error) {
    return null;
  }
};
