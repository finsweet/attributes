import { getAttribute, getSettingSelector } from '../utils';

/**
 * Custom logic function to determine if a class should trigger inheritance.
 * @param classValue The class value to be checked.
 * @returns A boolean indicating if the classValue is a trigger class.
 */
const checkAddedAttribute = (classValue: string): boolean => {
  console.log('classValue', classValue);

  // todo: check other webflow w- or w-- classes?
  return classValue.includes('w--current');
};

/**
 * Initializes a mutation observer to dynamically inherit classes to specified elements based on conditions.
 * @param parentElement The parent element to which the mutation observer will be attached.
 * @returns An instance of MutationObserver used to monitor changes in attributes.
 */
export const initInheritClass = (parentElement: HTMLElement): MutationObserver => {
  const inheritElements = parentElement.querySelectorAll(getSettingSelector('class'));

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const currentClassValue = parentElement.getAttribute('class') || '';
        const triggerClass = checkAddedAttribute(currentClassValue);

        if (triggerClass) {
          inheritElements.forEach((childElement) => {
            const inheritClass = getAttribute(childElement, 'class');

            if (inheritClass && !childElement.classList.contains(inheritClass)) {
              childElement.classList.add(inheritClass);
            }
          });
          return;
        }

        // Remove class from all child elements
        inheritElements.forEach((childElement) => {
          const inheritClass = getAttribute(childElement, 'class');

          if (inheritClass && childElement.classList.contains(inheritClass)) {
            childElement.classList.remove(inheritClass);
          }
        });
      }
    }
  });

  observer.observe(parentElement, { attributes: true });

  return observer;
};
