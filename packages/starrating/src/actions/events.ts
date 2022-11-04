import { addListener, isElement } from '@finsweet/ts-utils';

import { getClosestRadioField, getClosestGroup, queryStar, queryRadio } from '../utils/helpers';
import { setClasses } from './classes';

/**
 * Stores the currently active groups.
 */
const activeGroupsStore: Set<Element> = new Set();

/**
 * Listens for all hover / unhover / focus events to trigger the stars.
 * @returns Cleanup callbacks.
 */
export const listenEvents = () => {
  const cleanups = [
    addListener(window, 'mouseover', handleGroupHover),
    addListener(window, 'focusin', handleGroupHover),
    addListener(window, 'mouseover', handleGroupUnhover),
    () => activeGroupsStore.clear(),
  ];

  return cleanups;
};

/**
 * Handles when the user hovers a group's stars.
 * @param e
 */
const handleGroupHover = ({ target }: Event) => {
  if (!isElement(target)) return;

  const radioField = getClosestRadioField(target);
  if (!radioField) return;

  const group = getClosestGroup(target);
  if (!group) return;

  const star = queryStar(radioField);
  if (!star) return;

  const radio = queryRadio(radioField);
  if (!radio) return;

  const { name, value } = radio;

  const hoveredValue = parseInt(value);
  if (isNaN(hoveredValue)) return;

  activeGroupsStore.add(group);

  setTimeout(() => setClasses(name, group, hoveredValue));
};

/**
 * Handles when the user stops hovering over a group's stars.
 * @param e
 */
const handleGroupUnhover = ({ target }: Event) => {
  if (!activeGroupsStore.size) return;
  if (!isElement(target)) return;

  for (const activeGroup of activeGroupsStore) {
    const group = getClosestGroup(target);

    if (!group || activeGroup !== group) {
      const star = queryStar(activeGroup);
      if (!star) continue;

      const radioField = getClosestRadioField(star);
      if (!radioField) continue;

      const radio = queryRadio(radioField);
      if (!radio) continue;

      setClasses(radio.name, activeGroup);
      activeGroupsStore.delete(activeGroup);
    }
  }
};
