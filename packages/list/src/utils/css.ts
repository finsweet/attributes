import { cloneNode, WEBFLOW_ASSETS_CDN_ORIGIN } from '@finsweet/attributes-utils';

let currentPageStylesheets: Set<string> | undefined;

const attachedExternalStylesheets = new Set<string>();

/**
 * Retrieves the stylesheets linked in the current page that are hosted on the Webflow Assets CDN.
 * @returns A set of stylesheet URLs.
 */
const getCurrentPageStylesheets = () => {
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

export const attachExternalStylesheets = (page: Document) => {
  const currentPageStylesheets = getCurrentPageStylesheets();
  const externalStylesheetElements = [
    ...page.documentElement.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
  ];

  return Promise.all(
    externalStylesheetElements.map((stylesheet) => {
      const { href } = stylesheet;

      try {
        const { origin } = new URL(href);
        if (origin !== WEBFLOW_ASSETS_CDN_ORIGIN) return;
        if (currentPageStylesheets.has(href)) return;
        if (attachedExternalStylesheets.has(href)) return;

        attachedExternalStylesheets.add(href);

        return new Promise((resolve) => {
          const clone = cloneNode(stylesheet);

          // Load styles
          clone.addEventListener('load', () => resolve(undefined), { once: true });

          document.head.append(clone);

          // Max 10s timeout
          window.setTimeout(() => resolve(undefined), 10000);
        });
      } catch {
        return;
      }
    })
  );
};
