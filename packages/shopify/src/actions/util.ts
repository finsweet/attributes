import { queryElement, LOADER } from '../utils/constants';

export const body = document.querySelector('body') as HTMLElement;

export const hideLoader = () => {
  const matchedElements = queryElement(LOADER, {
    scope: body,
    all: true,
  }) as NodeListOf<HTMLElement>;

  matchedElements.forEach((element: HTMLElement) => {
    element.style.display = 'none';
  });
};
