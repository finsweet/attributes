import type { Atom } from 'nanostores';

type StoresValues<T> = { [K in keyof T]: T[K] extends Atom<infer U> ? U : never };

/**
 * Subscribes to multiple nanostores.
 * @param atoms
 * @param callback
 * @returns A cleanup function.
 */
export const subscribeMultiple = <T extends readonly [Atom, ...Array<Atom>]>(
  atoms: T,
  callback: (values: StoresValues<T>) => void
) => {
  const listener = () => {
    const values = atoms.map((i) => i.get()) as StoresValues<T>;
    callback(values);
  };

  const cleanups = atoms.map((i) => i.subscribe(listener));

  return () => cleanups.forEach((i) => i());
};
