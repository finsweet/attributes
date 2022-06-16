import { Debug } from '@finsweet/ts-utils';

const ANIMATIONS_SOURCE = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-animation@1/functions.js';

type AnimationImport = typeof window.fsAttributes.animationImport;

/**
 * Dynamically imports the `animation` package.
 * After the first import, it stores the response in {@link window.fsAttributes.animation}.
 * @returns A `Promise` of the package response.
 */
export const importAnimations = async (): Promise<AnimationImport> => {
  const { fsAttributes } = window;

  if (fsAttributes.animationImport) return fsAttributes.animationImport;

  try {
    const animationsImport = import(ANIMATIONS_SOURCE);

    fsAttributes.animationImport = animationsImport;

    return animationsImport;
  } catch (error) {
    Debug.alert(`${error}`, 'error');
    return;
  }
};
