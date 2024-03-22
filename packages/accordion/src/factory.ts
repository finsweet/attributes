import { addListener, isVisible } from '@finsweet/attributes-utils';

import { setAccordionA11y } from './actions/a11y';
import { setActiveClass } from './actions/classes';
import { closeContent, openContent } from './actions/content';
import { getAccordionSettings, getGroupSettings } from './actions/settings';
import { getElementSelector } from './utils/selectors';
import type { AccordionData, AccordionGroupData } from './utils/types';

/**
 * Inits an accordion group.
 * @param accordion
 * @param groupsData
 * @returns
 */
export const initAccordionGroup = (accordion: HTMLElement, groupsData: AccordionGroupData[]) => {
  const group = accordion.closest<HTMLElement>(getElementSelector('group')) || document.body;

  let groupData = groupsData.find((data) => data.group === group);
  if (!groupData) {
    groupData = getGroupSettings(group);

    groupsData.push(groupData);
  }

  const accordionData = groupData.accordions.find((data) => data.accordion === accordion);
  if (accordionData) return groupData;

  const controls = initAccordion(accordion, groupData);
  if (controls) {
    groupData.accordions.push({
      accordion,
      controls,
    });
  }

  setInitialGroupState(groupData);

  return groupData;
};

/**
 * Inits an accordion.
 * @param accordion
 * @param groupData
 *
 * @returns The accordion's controls.
 */
const initAccordion = (
  accordion: HTMLElement,
  groupData: AccordionGroupData
): AccordionData['controls'] | undefined => {
  const settings = getAccordionSettings(accordion, groupData);
  if (!settings) return;

  const { trigger, content } = settings;

  let isOpen = isVisible(content);
  let cancel: (() => void) | undefined;

  // Force the content to be closed if the accordion is not visible.
  if (!isVisible(accordion)) {
    cancel = closeContent(content);
  }

  setAccordionA11y(trigger, content);
  setActiveClass({
    ...settings,
    isOpen,
  });

  /**
   * Expands/contracts the content element.
   * @param event The Event object, if it was done by a user interaction.
   */
  const toggleContent = (event?: Event) => {
    cancel?.();
    cancel = undefined;

    if (isOpen) {
      cancel = closeContent(content);
      isOpen = false;
    } else {
      openContent(content);
      isOpen = true;

      // Close all other Accordions if the group is single.
      if (groupData.single && event) {
        for (const data of groupData.accordions) {
          if (data.accordion !== accordion) data.controls.close();
        }
      }
    }

    setActiveClass({
      ...settings,
      isOpen,
    });
  };

  const destroy = addListener(trigger, 'click', toggleContent);

  return {
    destroy,
    open: () => {
      if (!isOpen) toggleContent();
    },
    close: () => {
      if (isOpen) toggleContent();
    },
    isOpen: () => isOpen,
  };
};

/**
 * Ensures all accordions are correctly open/closed on page load.
 * @param groupData
 */
const setInitialGroupState = ({ single, initial, accordions }: AccordionGroupData) => {
  let openedSingle = false;

  const isInitialNone = initial === 'none';
  const isInitialIndexes = Array.isArray(initial);

  for (const [index, { controls }] of accordions.entries()) {
    const adjustedIndex = index + 1;

    const shouldOpen = isInitialIndexes && initial.includes(adjustedIndex);
    const shouldClose =
      (single && openedSingle) || (isInitialIndexes && !initial.includes(adjustedIndex)) || isInitialNone;

    if (shouldClose) {
      controls.close();
      continue;
    }

    if (shouldOpen) {
      controls.open();
      openedSingle = true;
    }

    openedSingle ||= controls.isOpen();
  }
};
