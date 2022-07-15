import { queryElement, LOADER } from '../utils/constants';

export const hideLoader = () => {
  const matchedElements = queryElement(LOADER, {
    all: true,
  }) as NodeListOf<HTMLElement>;

  matchedElements.forEach((element: HTMLElement) => {
    element.style.display = 'none';
  });
};
