import { noop } from '@finsweet/ts-utils';

/**
 * Finalizes an Attribute initialization.
 * @param attributeKey The Attribute key.
 * @param resolveValue The value to resolve from the load Promise, if existing.
 * @param destroyCallback The destroy callback. If not provided, a noop will be assigned.
 */
export function finalizeAttribute<ResolveValue>(
  attributeKey: string,
  resolveValue: ResolveValue,
  destroyCallback?: () => void
): ResolveValue;
export function finalizeAttribute(
  attributeKey: string,
  resolveValue?: undefined,
  destroyCallback?: () => void
): undefined;
export function finalizeAttribute<ResolveValue>(
  attributeKey: string,
  resolveValue?: ResolveValue,
  destroyCallback?: () => void
): ResolveValue | undefined {
  const attribute = window.fsAttributes[attributeKey];

  attribute.destroy = destroyCallback || noop;
  attribute.resolve?.(resolveValue);

  return resolveValue as ResolveValue;
}
