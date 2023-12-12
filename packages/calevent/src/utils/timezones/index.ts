import { isNotEmpty } from '@finsweet/attributes-utils';

import type { TimeZone } from '../types';
import timezones from './timezones.json';

/**
 * Get the current timezone code.
 * @returns The current timezone code.
 */
export const currentTimezoneCode = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Check if the timezone code is valid.
 * @param tzCode The timezone code.
 * @returns Whether the timezone code is valid.
 */
export const isValidTimeZone = (tzCode: string | undefined): boolean => {
  return isNotEmpty(tzCode) && timezones.some((tz) => tz.tzCode === tzCode);
};

/**
 * Get the timezone object by the timezone code.
 * @param tzCode The timezone code.
 * @returns The timezone object.
 */
export const getTimeZoneByCode = (tzCode: string): TimeZone | undefined => {
  return timezones.find((tz) => tz.tzCode === tzCode);
};

export type { TimeZone };
export default timezones as TimeZone[];
