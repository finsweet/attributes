import { queryAllElements } from '../utils/selectors';

/**
 * Hides all `fs-shopify-element="loader"` elements.
 */
export const hideLoaders = () => {
  const allElements = queryAllElements<HTMLElement>('loader');

  for (const element of allElements) {
    element.style.display = 'none';
  }
};
