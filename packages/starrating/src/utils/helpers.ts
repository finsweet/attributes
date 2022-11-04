import { FORM_CSS_CLASSES } from '@finsweet/ts-utils';

import { getSelector, queryElement } from './constants';

/**
 * @returns The closest star rating group parent from a target.
 * @param target
 */
export const getClosestGroup = (target: Element) => target.closest(getSelector('element', 'group'));

/**
 * @returns The closest Radio Field parent from a target.
 * @param target
 */
export const getClosestRadioField = (target: Element) =>
  target.closest<HTMLLabelElement>(`.${FORM_CSS_CLASSES.radioField}`);

/**
 * @returns A child star element of the provided scope.
 * @param scope
 */
export const queryStar = (scope: Element) => queryElement('star', { operator: 'prefixed', scope });

/**
 *
 * @returns A radio element selector.
 * Optionally, the selector can be narrowed down by name.
 * @param name
 */
export const getRadioSelector = (name?: string) => `input[type="radio"]${name ? `[name="${name}"]` : ''}`;

/**
 * @returns A child radio element of the provided scope.
 * @param scope
 */
export const queryRadio = (scope: Element) => scope.querySelector<HTMLInputElement>(getRadioSelector());

/**
 * @returns All radio elements.
 * If the name is provided, only the radio elements belonging to the same group are returned.
 *
 * @param name A radio group name.
 */
export const getAllRadios = (scope: Document | Element = document, name?: string) => [
  ...scope.querySelectorAll<HTMLInputElement>(getRadioSelector(name)),
];

/**
 * Gets the selected value of a Radio Group.
 * @param name The Radio Group Name.
 * @returns The selected value as an integer, if valid.
 */
export const getSelectedGroupValue = (name: string) => {
  let selectedValue: number | undefined;

  const selectedRadio = document.querySelector<HTMLInputElement>(`${getRadioSelector(name)}:checked`);
  if (selectedRadio) {
    const rawSelectedValue = parseInt(selectedRadio.value);
    if (!isNaN(rawSelectedValue)) selectedValue = rawSelectedValue;
  }

  return selectedValue;
};
