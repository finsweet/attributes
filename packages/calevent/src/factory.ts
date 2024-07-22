import { collectGoogleData, collectIcsData, collectOutlookData } from './actions/collect';
import {
  createGoogleCalendarEventURL,
  createIcsCalendarDownloadURL,
  createOutlookCalendarEventURL,
} from './actions/invite';
import {
  CALENDAR_EVENT_PLATFORMS,
  type CalendarEventPlatform,
  getCMSItemWrapper,
  getInstance,
  queryAllElements,
  stores,
} from './utils';

/**
 * Create calendar event instances.
 * @param scope The scope to query elements from.
 * @returns The calendar event instances.
 */
export const createCalendarEventInstances = (scope?: HTMLElement) => {
  for (const platform in CALENDAR_EVENT_PLATFORMS) {
    const eventPlatform = platform as CalendarEventPlatform;

    // Get all trigger elements for the current platform
    const platformButtons = queryAllElements(eventPlatform, { scope });

    // Get the creator function for the current platform (e.g. creators.google)
    const create = creators[eventPlatform];

    platformButtons.forEach(create);
  }
};

/**
 * The calendar event creators.
 * @param trigger The trigger element that was clicked
 */
const creators: Record<CalendarEventPlatform, (trigger: HTMLElement) => void> = {
  google: (trigger) => {
    if (stores.google.has(trigger)) return;

    const instance = getInstance(trigger);

    const cmsListItem = getCMSItemWrapper(trigger);

    const google = collectGoogleData(trigger, instance, cmsListItem);

    const inviteUrl = createGoogleCalendarEventURL(google);

    stores.google.set(trigger, inviteUrl);
  },
  outlook: function (trigger: HTMLElement): void {
    if (stores.outlook.has(trigger)) return;

    const instance = getInstance(trigger);

    const cmsListItem = getCMSItemWrapper(trigger);

    const outlook = collectOutlookData(trigger, instance, cmsListItem);

    const inviteUrl = createOutlookCalendarEventURL(outlook);

    stores.outlook.set(trigger, inviteUrl);
  },
  apple: function (trigger: HTMLElement): void {
    if (stores.apple.has(trigger)) return;

    const instance = getInstance(trigger);

    const cmsListItem = getCMSItemWrapper(trigger);

    const apple = collectIcsData(trigger, instance, cmsListItem);

    const inviteUrl = createIcsCalendarDownloadURL(apple);

    stores.apple.set(trigger, inviteUrl);
  },
};
