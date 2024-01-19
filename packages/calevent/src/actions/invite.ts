import { getObjectEntries } from '@finsweet/attributes-utils';

import { CALENDAR_EVENT_PLATFORMS, type CalendarEventOrganizer, type Google, type Outlook } from '../utils';

/**
 * Generate the Google Calendar event URL.
 * @param event The event object
 * @returns The Google Calendar event URL
 */
export function createGoogleCalendarEventURL(event: Google) {
  // Define the base Google Calendar event URL
  const baseGoogleCalendarURL = new URL(CALENDAR_EVENT_PLATFORMS.google);

  // Add the query parameters to the base URL
  const googleCalendarEventURL = new URL(baseGoogleCalendarURL.href);
  getObjectEntries(event).forEach(([key, value]) => {
    if (!value) return;
    googleCalendarEventURL.searchParams.append(key, value.toString());
  });

  return googleCalendarEventURL;
}

/**
 * Generate the Outlook Calendar event URL.
 * @param event The event object
 * @returns The Outlook Calendar event URL
 */
export function createOutlookCalendarEventURL(event: Outlook) {
  // Define the base Outlook Calendar event URL
  const baseOutlookCalendarURL = new URL(CALENDAR_EVENT_PLATFORMS.outlook);

  // Add the query parameters to the base URL
  const outlookCalendarEventURL = new URL(baseOutlookCalendarURL.href);
  getObjectEntries(event).forEach(([key, value]) => {
    if (!value) return;
    outlookCalendarEventURL.searchParams.append(key, value.toString());
  });

  return outlookCalendarEventURL;
}

/**
 * Generate the ICS Calendar event URL.
 * @param calendarChunks The event object
 * @returns The ICS Calendar event URL
 */
export function createIcsCalendarDownloadURL(
  calendarChunks: Record<string, string | CalendarEventOrganizer | undefined>[]
) {
  let calendarUrl = '';

  // Get the key value pairs from the calendarChunks object
  calendarChunks.forEach((chunk) => {
    if (chunk.value) {
      if (chunk.key === 'ORGANIZER') {
        // if the key is ORGANIZER, then the value is an object of type CalendarEventOrganizer, process it accordingly
        const value = chunk.value as CalendarEventOrganizer;
        calendarUrl += `${chunk.key};${encodeURIComponent(`CN=${value.name}:MAILTO:${value.email}\r\n`)}`;
      } else {
        calendarUrl += `${chunk.key}:${encodeURIComponent(`${chunk.value}\r\n`)}`;
      }
    }
  });

  return `data:text/calendar;charset=utf8,${calendarUrl}`;
}
