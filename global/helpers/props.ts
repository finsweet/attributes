/**
 * Normalizes a property key.
 * - Trims the string.
 * - Lowercases the string.
 *
 * @param propKey The property key to normalize.
 */
export function normalizePropKey(propKey: string): string;
export function normalizePropKey(propKey?: string | null): string | undefined;
export function normalizePropKey(propKey?: string | null): string | undefined {
  return propKey?.trim().toLowerCase();
}
