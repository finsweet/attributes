import type { PaginationOptions } from 'swiper/types/modules/pagination';

import { getAttribute } from './selectors';

const PAGINATION_TYPE_ALIASES: Record<string, PaginationOptions['type']> = {
  bullets: 'bullets',
  count: 'fraction',
  thumbs: 'custom',
  progress: 'progressbar',
};

/**
 * Transforms pagination type that comes from the HTML element.
 * In to type that is supported by Swiper library
 * @param paginationType
 * @returns Returns Swiper pagination type.
 */
export const transformPaginationType = (paginationType: string): PaginationOptions['type'] =>
  PAGINATION_TYPE_ALIASES[paginationType];

/**
 * Transforms pagination element to pagination Type.
 * In to type that is supported by Swiper library
 * @param objectWithElements
 * @returns Returns Swiper pagination type.
 */
export const transformPaginationElementToType = ({
  bulletElement,
  progressElement,
  countElement,
  thumbElement,
}: {
  [key: string]: HTMLElement | null;
}): PaginationOptions['type'] => {
  if (bulletElement) {
    return 'bullets';
  }
  if (progressElement) {
    return 'progressbar';
  }
  if (countElement) {
    return 'fraction';
  }
  if (thumbElement) {
    return 'custom';
  }
  return 'bullets';
};

/**
 * @returns The class required by Swiper library for bullets type pagination
 * @param element
 */
export const getPaginationBulletClass = (element: HTMLElement | null): string | undefined => {
  if (!element) return;
  return element.classList[0];
};

/**
 * @returns The class required by Swiper library for thumbs type pagination
 * @param element
 */
export const getPaginationActiveThumbClass = (element: HTMLElement | null): string | undefined => {
  if (!element) return;
  return getAttribute(element, 'cmsactive') || 'is-active';
};

/**
 * Converts rem value into px equivalent
 * @param rem
 * @returns Returns number of px
 */
function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/**
 * @returns Swiper breakpoints parameters from string
 * with structure slidesPerView,SlidesperGroup,spaceBetween
 * @param strWithParams
 */
export const getBreakpointParams = (
  strWithParams: string | null | undefined
): {
  slidesPerView: number | 'auto';
  slidesPerGroup: number;
  spaceBetween: string;
} | null => {
  if (!strWithParams) return null;
  const values = strWithParams.split(',');
  const slidesPerView = values[0] === 'auto' ? 'auto' : parseFloat(values[0]);
  const slidesPerGroup = parseFloat(values[1]);
  let spaceBetween = values[2];
  if (spaceBetween?.includes('rem')) {
    const remValue = parseFloat(spaceBetween);
    const pixelsValue = convertRemToPixels(remValue);
    spaceBetween = `${pixelsValue}px`;
  }
  return { slidesPerView, slidesPerGroup, spaceBetween };
};

/**
 * Dispatches a click event on all visible slides within the given slider wrapper element.
 * @param sliderWrapperElement - The DOM element that contains the visible slides.
 */
export const dispatchClickOnVisibleSlides = (sliderWrapperElement: Element) => {
  const visibleSlides = sliderWrapperElement.querySelectorAll('.swiper-slide-visible');
  const visibleSlidesArray = Array.from(visibleSlides);

  if (visibleSlides.length > 1) visibleSlidesArray.pop();

  const clickEvent = new Event('click', { bubbles: true, cancelable: true });

  visibleSlidesArray.forEach(function (slide) {
    slide.dispatchEvent(clickEvent);
  });
};

/**
 * Sets 'pointer-events: none' on the specified element and its children, while restoring 'pointer-events: auto' on the children.
 * @param element - The DOM element to modify the pointer events for.
 */
export const setPointerEventsNoneToElementAndChildren = (element: HTMLElement) => {
  element.style.pointerEvents = 'none';

  const childElements = element.querySelectorAll<HTMLElement>('*');

  for (const childElement of childElements) {
    childElement.style.pointerEvents = 'auto';
  }
};
