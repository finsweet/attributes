import { WEBFLOW_ASSETS_CDN_ORIGIN } from '@finsweet/attributes-utils';

let currentPageStylesheets: Set<string> | undefined;

/**
 * Retrieves the stylesheets linked in the current page that are hosted on the Webflow Assets CDN.
 * @returns A set of stylesheet URLs.
 */
export const getCurrentPageStylesheets = () => {
  if (currentPageStylesheets) return currentPageStylesheets;

  const stylesheets = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]');
  currentPageStylesheets = new Set<string>();

  for (const stylesheet of stylesheets) {
    const { href } = stylesheet;

    try {
      const { origin } = new URL(href);
      if (origin !== WEBFLOW_ASSETS_CDN_ORIGIN) continue;

      currentPageStylesheets.add(href);
    } catch {
      continue;
    }
  }

  return currentPageStylesheets;
};
