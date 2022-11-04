import type { TOCItem } from '../components/TOCItem';
import { getSelector } from '../utils/constants';
import type { ScrollOffsetStyles } from '../utils/types';

/**
 * Sets scroll offset to all headings using CSS scroll-margin.
 * @param tocWrapper
 * @param tocItems
 * @param offsets
 *
 */
export const setScrollOffsets = (tocItems: TOCItem[], offsets: ScrollOffsetStyles) => {
  if (!Object.values(offsets).some(Boolean)) return;

  document.documentElement.style.scrollBehavior = 'smooth';

  for (const tocItem of tocItems) {
    tocItem.setScrollOffset(offsets);
  }
};

/**
 * Scrolls into view the currently active hash anchor in the URL, only if it's part of the table of contents.
 */
export const scrollToAnchor = () => {
  const { hash } = window.location;
  if (!hash) return;

  const id = hash.replace('#', '');
  const headingWrapper = document.querySelector(
    `${getSelector('element', 'contents', { operator: 'prefixed' })} [id="${id}"]`
  );

  if (headingWrapper) headingWrapper.scrollIntoView({ behavior: 'smooth' });
};
