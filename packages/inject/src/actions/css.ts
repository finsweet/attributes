import { cloneNode } from '@finsweet/attributes-utils';

/**
 * Attaches the page styles to a Shadow DOM.
 * @param shadowRoot The root of the Shadow DOM.
 * @param source The source's page document.
 * @returns A Promise that fulfills when all styles have been 100% loaded (with a 10s max timeout).
 */
export const attachPageStyles = async (shadowRoot: ShadowRoot, source: Document) => {
  const styleTags = [...source.querySelectorAll('style, link[rel="stylesheet"]')];

  return Promise.all(
    styleTags.map(
      (styleTag) =>
        new Promise((resolve) => {
          const clone = cloneNode(styleTag);

          // Load styles
          clone.addEventListener('load', () => resolve(undefined), { once: true });
          shadowRoot.append(clone);

          // Max 10s timeout
          window.setTimeout(() => resolve(undefined), 10000);
        })
    )
  );
};
