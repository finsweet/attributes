import { extractCommaSeparatedValues, isKeyOf, isNotEmpty } from '@finsweet/ts-utils';

import { parseNumericAttribute } from '$global/helpers';

import {
  ATTRIBUTES,
  DEFAULT_ACTIVE_CLASS,
  getAttribute,
  queryElement,
  SINGLE_SETTING_VALUES,
} from '../utils/constants';
import type { AccordionGroupData, InitialState } from '../utils/types';

/**
 * Collects a group's settings.
 * @param group
 * @returns A new {@link AccordionGroupData} object.
 */
export const getGroupSettings = (group: HTMLElement): AccordionGroupData => {
  const single = getAttribute(group, 'single') === SINGLE_SETTING_VALUES.true;
  const rawInitial = getAttribute(group, 'initial');
  const activeClass = getAttribute(group, 'active') || DEFAULT_ACTIVE_CLASS;

  let initial: InitialState;

  if (rawInitial) {
    if (isKeyOf(rawInitial, Object.values(ATTRIBUTES.initial.values))) {
      initial = rawInitial;
    } else {
      const rawInitialValues = extractCommaSeparatedValues(rawInitial);
      initial = rawInitialValues.map(parseNumericAttribute).filter(isNotEmpty);
    }
  }

  return { single, initial, activeClass, accordions: [] };
};

/**
 * @returns An accordion's settings.
 * @param accordion
 * @param groupData
 */
export const getAccordionSettings = (accordion: HTMLElement, groupData: AccordionGroupData) => {
  const trigger = queryElement<HTMLElement>('trigger', { operator: 'prefixed', scope: accordion });
  const content = queryElement<HTMLElement>('content', { operator: 'prefixed', scope: accordion });
  const arrow = queryElement<HTMLElement>('arrow', { operator: 'prefixed', scope: accordion });

  if (!trigger || !content) return;

  const groupActiveClass = groupData.activeClass;
  const accordionActiveClass = getAttribute(accordion, 'active');
  const triggerActiveClass = getAttribute(trigger, 'active');
  const contentActiveClass = getAttribute(content, 'active');
  const arrowActiveClass = arrow ? getAttribute(arrow, 'active') : null;

  return {
    accordion,
    trigger,
    content,
    arrow,
    groupActiveClass,
    accordionActiveClass,
    triggerActiveClass,
    contentActiveClass,
    arrowActiveClass,
  };
};
