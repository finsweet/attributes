import { ANCHOR_SELECTOR } from '../utils/constants';
import { queryElement } from '../utils/selectors';
import type { LinkData } from '../utils/types';

/**
 * Queries the TOC wrapper and replaces the template links for an anchor placeholder.
 * @param linksData
 * @param instance
 *
 * @returns The TOC wrapper element.
 */
export const prepareTOC = ([{ component: firstLinkComponent }]: LinkData[], instance?: string) => {
  const tocWrapper = queryElement('table', { instance }) || firstLinkComponent.parentElement;
  if (!tocWrapper) return;

  const anchor = new Comment(ANCHOR_SELECTOR);
  const isDirectChild = firstLinkComponent.parentElement === tocWrapper;

  if (isDirectChild) tocWrapper.insertBefore(anchor, firstLinkComponent);
  else tocWrapper.append(anchor);

  firstLinkComponent.remove();

  return tocWrapper;
};
