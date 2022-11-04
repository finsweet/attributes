import { isNotEmpty, restartWebflow } from '@finsweet/ts-utils';

import { TOC_ATTRIBUTE, RICH_TEXT_ATTRIBUTE, CMS_ATTRIBUTE_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { getInstanceIndex } from '$global/helpers';

import { collectHeadingsData, collectLinksData } from './actions/collect';
import { listenTOCLinkClicks } from './actions/events';
import { observeLinksState } from './actions/observe';
import { populateLinks } from './actions/populate';
import { prepareTOC } from './actions/prepare';
import { scrollToAnchor, setScrollOffsets } from './actions/scroll';
import { ATTRIBUTES, queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<void> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE, RICH_TEXT_ATTRIBUTE);

  const contentsElements = queryElement<HTMLElement>('contents', { operator: 'prefixed', all: true });

  const cleanups = contentsElements
    .map((contentsElement) => {
      const instanceIndex = getInstanceIndex(contentsElement, ATTRIBUTES.element.key);

      const linkTemplate = queryElement('link', { instanceIndex });
      if (!linkTemplate) return;

      const headingsData = collectHeadingsData(contentsElement);
      const linksData = collectLinksData(linkTemplate) || [];

      if (!headingsData.length || !linksData.length) return;

      const tocWrapper = prepareTOC(linksData, instanceIndex);
      if (!tocWrapper) return;

      const tocItems = populateLinks(headingsData, linksData, tocWrapper);

      // Scroll offset
      const scrollMarginTop = contentsElement.getAttribute(ATTRIBUTES.scrollMarginTop.key) || undefined;
      const scrollMarginBottom = contentsElement.getAttribute(ATTRIBUTES.scrollMarginBottom.key) || undefined;

      setScrollOffsets(tocItems, { scrollMarginTop, scrollMarginBottom });

      // Handle TOC link clicks
      const hideURLHash =
        contentsElement.getAttribute(ATTRIBUTES.hideURLHash.key) === ATTRIBUTES.hideURLHash.values.true;
      const removeListener = listenTOCLinkClicks(tocWrapper, hideURLHash);

      // Link States
      const observer = observeLinksState(tocWrapper, tocItems);

      return () => {
        removeListener();
        observer.disconnect();
      };
    })
    .filter(isNotEmpty);

  // URL hash Anchor
  scrollToAnchor();

  await restartWebflow();

  // TODO: Finish API
  return finalizeAttribute(TOC_ATTRIBUTE, undefined, () => {
    for (const cleanup of cleanups) cleanup();
  });
};
