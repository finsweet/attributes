import { queryElement } from '../utils/constants';

/**
 * Hides all `fs-shopify-element="loader"` elements.
 */
export const hideLoaders = () => {
  const allElements = queryElement<HTMLElement>('loader', { all: true });

  for (const element of allElements) {
    element.style.display = 'none';
  }
};
