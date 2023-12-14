/**
 * Creates a dynamic attribute value.
 * @param value The static attribute value.
 * @returns A callback for generating new attribute values by index.
 */
export const generateDynamicAttibuteValue = (value: string) => {
  return (index?: number): string => `${value}${index ? `-${index}` : ''}`;
};
