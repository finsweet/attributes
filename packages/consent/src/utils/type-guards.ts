import { isKeyOf } from '@finsweet/attributes-utils';

import { CONSENTS, type Consents } from '../utils';

/**
 * Check if a consents object is valid
 * @param consents
 * @returns True/false
 */
export const isValidConsents = (consents: Record<string, unknown>): consents is Partial<Consents> =>
  Object.keys(consents).every((key) => isKeyOf(key, CONSENTS));
