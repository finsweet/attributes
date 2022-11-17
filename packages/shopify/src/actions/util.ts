import { queryElement, LOADER } from '../utils/constants';

export const hideLoader = () => {
  const matchedElements = queryElement<HTMLElement>(LOADER, {
    all: true,
  });

  matchedElements.forEach((element: HTMLElement) => {
    element.style.display = 'none';
  });
};
