import { addListener, isElement } from '@finsweet/attributes-utils';

import { CALENDAR_EVENT_PLATFORMS, type CalendarEventPlatform, getElementSelector, stores } from '../utils';

/**
 * Listen for clicks on the trigger element.
 * @returns {Function} A callback to remove the event listener.
 */
export const listenTriggerClicks = () => {
  const clickCleanUp = addListener(document, 'click', (e) => {
    const { target } = e;
    if (!isElement(target)) return;

    for (const key in CALENDAR_EVENT_PLATFORMS) {
      const platform = key as CalendarEventPlatform;

      const trigger = target.closest(getElementSelector(platform));
      if (!trigger) continue;

      const eventUrl = stores[platform].get(trigger);

      // open the event URL in a new tab
      window.open(eventUrl, '_blank');
    }
  });

  return clickCleanUp;
};
