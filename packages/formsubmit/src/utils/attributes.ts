import { isString } from '@finsweet/attributes-utils';

/**
 * Parses the `redirect`, `reset` and `reload` attributes.
 * @param attribute
 * @returns A tuple.
 */
export const parseActionAttribute = (attribute?: string) => {
  const shouldAct = isString(attribute);

  let actionTimeout: number | undefined;

  if (shouldAct) {
    const rawActionTimeout = parseInt(attribute);
    if (!isNaN(rawActionTimeout)) actionTimeout = rawActionTimeout;
  }

  return [shouldAct, actionTimeout] as const;
};
