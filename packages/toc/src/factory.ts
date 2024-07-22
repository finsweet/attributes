import { collectHeadingsData, collectLinksData } from './actions/collect';
import { listenTOCLinkClicks } from './actions/events';
import { observeLinksState } from './actions/observe';
import { populateLinks } from './actions/populate';
import { prepareTOC } from './actions/prepare';
import { setScrollOffsets } from './actions/scroll';
import { getAttribute, getInstance, hasAttributeValue, queryElement } from './utils/selectors';

/**
 * Inits a TOC instance.
 * @param contentsElement
 * @returns
 */
export const initTOCInstance = (contentsElement: HTMLElement) => {
  const instance = getInstance(contentsElement);

  const linkTemplate = queryElement('link', { instance });
  if (!linkTemplate) return;

  const headingsData = collectHeadingsData(contentsElement);
  const linksData = collectLinksData(linkTemplate) || [];

  if (!headingsData.length || !linksData.length) return;

  const tocWrapper = prepareTOC(linksData, instance);
  if (!tocWrapper) return;

  const tocItems = populateLinks(headingsData, linksData, tocWrapper);

  // Scroll offset
  const scrollMarginTop = getAttribute(contentsElement, 'offsettop');
  const scrollMarginBottom = getAttribute(contentsElement, 'offsetbottom');

  setScrollOffsets(tocItems, { scrollMarginTop, scrollMarginBottom });

  // Handle TOC link clicks
  const hideURLHash = hasAttributeValue(contentsElement, 'hideurlhash', 'true');
  const removeListener = listenTOCLinkClicks(tocWrapper, hideURLHash);

  // Link States
  const observer = observeLinksState(tocWrapper, tocItems);

  return () => {
    removeListener();
    observer.disconnect();
  };
};
