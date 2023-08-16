import { getAttribute } from '../utils';

/**
 * Initializes breakpoints for a grid layout based on window width and element attributes.
 * @param listElement - The element containing attributes for different breakpoints.
 * @returns An object with a clean method to remove the resize event listener.
 */
export const initBreakpoints = (listElement: HTMLElement) => {
  if (!listElement) return;
  const items = listElement.querySelectorAll<HTMLElement>('[role="listitem"]');
  if (!items) return;

  const breakpoints = {
    1920: getAttribute(listElement, '1920'),
    1440: getAttribute(listElement, '1440'),
    1280: getAttribute(listElement, '1280'),
    990: getAttribute(listElement, 'desktop'),
    767: getAttribute(listElement, 'tablet'),
    480: getAttribute(listElement, 'mobilelandscape'),
    300: getAttribute(listElement, 'mobileportrait'),
  };

  const sortedBreakpoints = Object.keys(breakpoints)
    .sort((a, b) => Number(b) - Number(a))
    .map((key) => parseInt(key) as keyof typeof breakpoints);

  let lastDefinedValue: string | undefined;

  for (const breakpoint of sortedBreakpoints) {
    if (breakpoints[breakpoint]) {
      lastDefinedValue = breakpoints[breakpoint];
    } else if (lastDefinedValue) {
      breakpoints[breakpoint] = lastDefinedValue;
    }
  }

  let visibleItems = breakpoints[sortedBreakpoints[0]];

  const updateItemsPerRow = () => {
    for (const breakpoint of sortedBreakpoints) {
      if (window.innerWidth <= Number(breakpoint)) {
        visibleItems = breakpoints[breakpoint];
      } else {
        break;
      }
    }
    items.forEach((item, index) => {
      if (index < Number(visibleItems)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };

  updateItemsPerRow();

  const resizeListener = () => updateItemsPerRow();
  window.addEventListener('resize', resizeListener);

  return {
    clean: () => {
      window.removeEventListener('resize', resizeListener);
    },
  };
};
