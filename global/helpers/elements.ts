import { nanoid } from 'nanoid';

/**
 * Ensures that an element has a unique ID.
 * If the element already has a unique ID, that one is preserved.
 * @param element
 * @returns Returns the unique ID assigned to the element.
 */
export const ensureUniqueId = (element: Element) => {
  if (!element.id || document.getElementById(element.id) !== element) {
    const id = nanoid();
    element.id = id;
    return id;
  }

  return element.id;
};
