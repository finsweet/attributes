import { ARIA_ROLE_KEY, ARIA_ROLE_VALUES } from '$global/constants/a11y';

import { setClasses } from './actions/classes';
import { getAllRadios } from './utils/helpers';

/**
 * Prepares a group with A11Y attributes and sets the initial state of the stars.
 * @param group
 */
export const initStarRatingGroup = (group: Element) => {
  // A11y
  group.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.radiogroup);

  // Initial state
  const allRadios = getAllRadios(group);
  const allNames = allRadios.reduce<Set<string>>((acc, { name }) => {
    acc.add(name);
    return acc;
  }, new Set());

  for (const name of allNames) {
    setClasses(name, group);
  }
};
