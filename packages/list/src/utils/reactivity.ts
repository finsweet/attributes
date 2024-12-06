import type { Reactive } from '@vue/reactivity';

/**
 * Sets a reactive object's value.
 * @param target
 * @param value
 */
export const setReactive = (target: Reactive<unknown>, value: unknown) => {
  Object.keys(target).forEach((key) => delete target[key as keyof typeof target]);
  Object.assign(target, value);
};
