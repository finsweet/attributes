import type { getAccordionSettings } from './settings';

/**
 * Adds/removes the active class from the accordion's elements.
 * @param params
 */
export const setActiveClass = ({
  accordion,
  trigger,
  content,
  arrow,
  isOpen,
  groupActiveClass,
  accordionActiveClass,
  arrowActiveClass,
  contentActiveClass,
  triggerActiveClass,
}: {
  isOpen: boolean;
} & ReturnType<typeof getAccordionSettings>) => {
  const action = isOpen ? 'add' : 'remove';

  accordion.classList[action](accordionActiveClass || groupActiveClass);
  trigger.classList[action](triggerActiveClass || groupActiveClass);
  content.classList[action](contentActiveClass || groupActiveClass);
  arrow?.classList[action](arrowActiveClass || groupActiveClass);
};
