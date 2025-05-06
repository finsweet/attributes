import { getSiteId } from '@finsweet/attributes-utils';

/**
 * Checks if an external page is from the same Webflow project.
 * @param page
 * @returns True if the page is from the same Webflow project, false otherwise.
 */
export const isSameWebflowProject = (page: Document) => {
  const currentPageSiteId = getSiteId();
  const fetchedPageSiteId = getSiteId(page);

  if (!currentPageSiteId || !fetchedPageSiteId) return false;

  return currentPageSiteId === fetchedPageSiteId;
};

/**
 * Converts all the relative URLs in a component to absolute URLs using the current window's origin.
 * @param component
 * @param source
 */
export const convertRelativeUrlsToAbsolute = (component: HTMLElement, source: URL) => {
  const links = component.querySelectorAll<HTMLAnchorElement>('a[href^="/"]');

  for (const link of links) {
    const href = link.getAttribute('href');
    if (!href) continue;

    try {
      const url = new URL(href, source.origin);
      link.href = url.toString();
    } catch {
      //
    }
  }
};
