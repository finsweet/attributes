import { ARROW_DOWN_KEY } from '@finsweet/attributes-utils';

import type { Settings } from '../../utils/types';

/**
 * Handles arrow keys events on the dropdown list.
 * Targets the focused option, or the first option if none is focused.
 * @param e The Event object.
 * @param settings The instance {@link Settings}.
 */
export const handleDropdownToggleArrowKeyEvents = (e: KeyboardEvent, { optionsStore }: Settings) => {
  const { key } = e;

  e.stopPropagation();

  if (key !== ARROW_DOWN_KEY) return;

  const firstOption = optionsStore.find(({ hidden }) => !hidden);
  const focusedOption = optionsStore.find(({ focused }) => focused);

  if (focusedOption) {
    focusedOption.element.focus();

    return;
  }

  if (firstOption) {
    firstOption.element.focus();

    return;
  }

  return;
};
