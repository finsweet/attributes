import { FORM_CSS_CLASSES } from '@finsweet/ts-utils';

import { DEFAULT_ACTIVE_CLASS, getAttribute, getSelector } from '../utils/constants';

/**
 * Handles adding/removing the active class from an input.
 * @param input
 */
export const handleInputActiveClass = (input: HTMLInputElement) => {
  // Checkboxes
  const isCheckbox = input.type === 'checkbox';
  const checkboxField = input.closest(`.${FORM_CSS_CLASSES.checkboxField}`);

  if (isCheckbox && checkboxField) {
    const activeClass = getActiveClass(input);

    setClass(checkboxField, activeClass, input.checked);
    return;
  }

  // Radios
  const isRadio = input.type === 'radio';
  if (!isRadio) return;

  const groupRadios = document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${input.name}"]`);
  for (const radio of groupRadios) {
    const radioField = radio.closest(`.${FORM_CSS_CLASSES.radioField}`);
    if (!radioField) continue;

    const activeClass = getActiveClass(radio);

    setClass(radioField, activeClass, radio.checked);
  }
};

/**
 * Gets the active class for a field.
 * @param target
 */
const getActiveClass = (target: Element) => {
  const activeClassElement = target.closest(getSelector('class'));
  if (!activeClassElement) return DEFAULT_ACTIVE_CLASS;

  const activeClass = getAttribute(activeClassElement, 'class');
  return activeClass || DEFAULT_ACTIVE_CLASS;
};

/**
 * Adds/removes the active class from an element.
 * @param target
 * @param className
 * @param add
 */
const setClass = (target: Element, className: string, add = true) =>
  target.classList[add ? 'add' : 'remove'](className);
