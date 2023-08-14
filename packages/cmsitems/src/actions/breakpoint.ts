import { getAttribute } from '../utils';

export const initBreakpoints = (listElement: HTMLElement) => {
  if (!listElement) return;

  const breakpoints = {
    1920: getAttribute(listElement, '1920'),
    1440: getAttribute(listElement, '1440'),
    1280: getAttribute(listElement, '1280'),
    990: getAttribute(listElement, 'desktop'),
    767: getAttribute(listElement, 'tablet'),
    480: getAttribute(listElement, 'mobilelandscape'),
    300: getAttribute(listElement, 'mobileportrait'),
  };

  const sortedBreakpoints = Object.keys(breakpoints).sort((a, b) => b - a);

  let itemsPerRow = breakpoints[sortedBreakpoints[0]];

  const updateItemsPerRow = () => {
    for (const breakpoint of sortedBreakpoints) {
      if (window.innerWidth <= breakpoint) {
        itemsPerRow = breakpoints[breakpoint];
        listElement.style.gridTemplateColumns = `repeat(${itemsPerRow}, 1fr)`;
      } else {
        break;
      }
    }
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
