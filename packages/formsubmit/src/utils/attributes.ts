/**
 * Parses the `redirect`, `reset` and `reload` attributes.
 * @param attribute
 * @returns A tuple.
 */
export const parseActionAttribute = (attribute: string | null) => {
  const shouldAct = typeof attribute === 'string';

  let actionTimeout: number | undefined;

  if (shouldAct) {
    const rawActionTimeout = parseInt(attribute);
    if (!isNaN(rawActionTimeout)) actionTimeout = rawActionTimeout;
  }

  return [shouldAct, actionTimeout] as const;
};
