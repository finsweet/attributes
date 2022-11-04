import { isHTMLAnchorElement } from '@finsweet/ts-utils';

import type { TOCItem } from '../components/TOCItem';

/**
 * Observes when the TOC links' state changes.
 * @param tocWrapper
 * @param tocItems
 *
 * @returns The MutationObserver.
 */
export const observeLinksState = (tocWrapper: HTMLElement, tocItems: TOCItem[]) => {
  const observer = new MutationObserver((mutations) => {
    for (const { target } of mutations) {
      if (!isHTMLAnchorElement(target)) continue;

      const tocItem = tocItems.find(({ linkElement }) => linkElement === target);
      if (!tocItem) continue;

      tocItem.updateState();
    }
  });

  observer.observe(tocWrapper, {
    attributes: true,
    subtree: true,
    attributeFilter: ['class'],
  });

  return observer;
};
