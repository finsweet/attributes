import { getAttribute, getInstanceIndex, getSettingSelector } from '../utils';

/**
 * Initializes a mutation observer to dynamically inherit classes to specified elements based on conditions.
 * @param parentElement - The parent element to which the mutation observer will be attached.
 * @returns An instance of MutationObserver used to monitor changes in attributes.
 */
export const initInheritClass = (parentElement: HTMLElement) => {
  const inheritClassSelector = getSettingSelector('class');
  const triggerClass = getAttribute(parentElement, 'listener');
  if (!triggerClass) return;
  const inheritElements = document.querySelectorAll(inheritClassSelector);
  const instanceIndex = getInstanceIndex(parentElement);

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (parentElement.classList.contains(triggerClass)) {
          inheritElements.forEach((childElement) => {
            if (!(Number(getAttribute(childElement, 'instance')) === instanceIndex)) return;
            const inheritClass = getAttribute(childElement, 'class');
            if (inheritClass && !childElement.classList.contains(inheritClass)) {
              childElement.classList.add(inheritClass);
            }
          });
        }
      }
    }
  });

  observer.observe(parentElement, { attributes: true });

  return observer;
};
