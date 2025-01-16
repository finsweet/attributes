import type { PaginationOptions } from 'swiper/types';

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
