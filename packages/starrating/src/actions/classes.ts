import { isNumber } from '@finsweet/ts-utils';

import { DEFAULT_ACTIVE_CLASS, getAttribute } from '../utils/constants';
import { getAllRadios, getClosestRadioField, getSelectedGroupValue, queryStar } from '../utils/helpers';

/**
 * Adds/removes the active classes of a group's stars.
 * @param name
 * @param group
 * @param hoveredValue
 */
export const setClasses = (name: string, group: Element, hoveredValue?: number) => {
  const groupActiveClass = getAttribute(group, 'activeClass');

  const selectedValue = getSelectedGroupValue(name);

  const allRadios = getAllRadios(document, name);

  for (const radio of allRadios) {
    const radioField = getClosestRadioField(radio);
    if (!radioField) continue;

    const star = queryStar(radioField);
    if (!star) continue;

    const starActiveClass = getAttribute(star, 'activeClass');
    const activeClass = starActiveClass || groupActiveClass || DEFAULT_ACTIVE_CLASS;

    const value = parseInt(radio.value);

    const isHovered = isNumber(hoveredValue) && value <= hoveredValue;
    const isSelected = isNumber(selectedValue) && value <= selectedValue;
    const isActive = isHovered || isSelected;

    if (isActive) {
      star.classList.add(activeClass);
    } else {
      star.classList.remove(activeClass);
    }
  }
};
