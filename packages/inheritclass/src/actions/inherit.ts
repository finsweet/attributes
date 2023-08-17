import { getAttribute, getSettingSelector } from '../utils';

export const initInheritClass = (parentElement: HTMLElement) => {
  const childClassSelector = getSettingSelector('class');
  const childElements = document.querySelectorAll(childClassSelector);

  parentElement.addEventListener('click', function () {
    childElements.forEach(function (childElement) {
      const inheritClass = getAttribute(childElement, 'class');
      if (inheritClass && !childElement.classList.contains(inheritClass)) {
        childElement.classList.add(inheritClass);
      }
    });
  });
};
