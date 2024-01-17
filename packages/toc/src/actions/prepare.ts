import { ANCHOR_SELECTOR } from '../utils/constants';
import { queryElement } from '../utils/selectors';
import type { LinkData } from '../utils/types';

/**
 * Queries the TOC wrapper and replaces the template links for an anchor placeholder.
 * @param instanceIndex
 * @param linksData
 *
 * @returns The TOC wrapper element.
 */
export const prepareTOC = ([{ component: firstLinkComponent }]: LinkData[], instanceIndex?: string) => {
  const tocWrapper = queryElement('table', { instanceIndex }) || firstLinkComponent.parentElement;
  if (!tocWrapper) return;

  const anchor = new Comment(ANCHOR_SELECTOR);
  const isDirectChild = firstLinkComponent.parentElement === tocWrapper;

  if (isDirectChild) tocWrapper.insertBefore(anchor, firstLinkComponent);
  else tocWrapper.append(anchor);

  firstLinkComponent.remove();

  return tocWrapper;
};
