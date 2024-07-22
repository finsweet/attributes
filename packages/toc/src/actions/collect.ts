import {
  ALLOWED_HEADINGS_SELECTOR,
  ANCHOR_SELECTOR,
  CUSTOM_HEADING_REGEXP,
  DEFAULT_INITIAL_HEADING_LEVEL,
  OMIT_HEADING_REGEXP,
} from '../utils/constants';
import { extractHeadingLevel } from '../utils/helpers';
import { getElementSelector } from '../utils/selectors';
import type { HeadingData, LinkData } from '../utils/types';
import { createHeadingWrapper } from './create';

/**
 * Collects the {@link HeadingData} of all heading elements.
 * @param contentsElement The element that holds all the contents.
 *
 * @returns A {@link HeadingData} array
 */
export const collectHeadingsData = ({ children }: HTMLElement) => {
  const headingsData: HeadingData[] = [];

  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    if (!child) continue;

    const headingElement = child.closest<HTMLParagraphElement>(ALLOWED_HEADINGS_SELECTOR);
    if (!headingElement) continue;

    const { tagName, textContent } = headingElement;
    if (!textContent) continue;

    const omit = textContent.match(OMIT_HEADING_REGEXP);
    if (omit) {
      headingElement.textContent = textContent.replace(OMIT_HEADING_REGEXP, '').trim();
      continue;
    }

    const [customTag] = textContent.match(CUSTOM_HEADING_REGEXP) || [];
    if (customTag) headingElement.textContent = textContent.replace(CUSTOM_HEADING_REGEXP, '').trim();

    const level = extractHeadingLevel(customTag || tagName);
    if (!level) continue;

    const headingWrapper = createHeadingWrapper(headingElement);
    if (!headingWrapper) continue;

    const { id } = headingWrapper;

    // Create a placeholder level memo when a heading level has been skipped
    // Example: the user added an <h5> after an <h3>, he skipped the <h4> level
    const [previousHeadingData] = headingsData;

    if (previousHeadingData?.level) {
      const correspondingLevel = previousHeadingData.level - 1;

      if (level < correspondingLevel) {
        for (let i = 1; i <= correspondingLevel - level; i++) {
          headingsData.unshift({ level: previousHeadingData.level - i });
        }
      }
    }

    // Render the wrapper
    headingElement.insertAdjacentElement('beforebegin', headingWrapper);

    // Group all lower elements under the wrapper
    const nextHeading = headingsData.find((headingData) => headingData.level <= level);
    const childrenSlice = Array.from(children).slice(i + 1);

    for (const element of childrenSlice) {
      if (element === nextHeading?.headingWrapper) break;

      headingWrapper.append(element);
    }

    // Store the data
    headingsData.unshift({
      level,
      headingElement,
      headingWrapper,
      id,
    });
  }

  return headingsData;
};

/**
 * Collects the template links data.
 * @param firstLinkTemplate
 * @returns A {@link LinkData} array.
 */
export const collectLinksData = (firstLinkTemplate: Element) => {
  const linksData: LinkData[] = [];

  const collectLinkData = (referenceNode: Element) => {
    // Query elements
    const linkElement = referenceNode.closest('a');
    if (!linkElement) return;

    const component = linkElement.parentElement;
    if (!component) return;

    // Get the link level
    const previousLevel = linksData[linksData.length - 1]?.level;
    const level = previousLevel ? previousLevel + 1 : DEFAULT_INITIAL_HEADING_LEVEL;

    linksData.push({
      linkElement,
      level,
      component,
    });

    // Get next link component
    const followingTextNodes = [...component.querySelectorAll(`* ${getElementSelector('link')}`)];
    const followingTextNode = followingTextNodes.find((node) => node !== referenceNode);

    if (!followingTextNode) return component;

    const followingComponent = collectLinkData(followingTextNode);

    // Place the anchor
    if (followingComponent) {
      const anchor = new Comment(ANCHOR_SELECTOR);
      component.insertBefore(anchor, followingComponent);
      followingComponent.remove();
    }

    return component;
  };

  // Init collection
  collectLinkData(firstLinkTemplate);

  return linksData;
};
