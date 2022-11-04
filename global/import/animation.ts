import { Debug } from '@finsweet/ts-utils';

import { ANIMATION_ATTRIBUTE } from '$global/constants/attributes';

import { createImportURL } from './create';

const ANIMATIONS_SOURCE = createImportURL(ANIMATION_ATTRIBUTE, '1', 'esm');

// TODO: Migrate to unified ESM imports using {@link window.fsAttributes.import}

/**
 * Dynamically imports the `animation` package.
 * After the first import, it stores the response in {@link window.fsAttributes.animation.import}.
 * @returns A `Promise` of the package response.
 */
export const importAnimations = async () => {
  const { fsAttributes } = window;

  fsAttributes.animation ||= {};
  const { animation } = fsAttributes;

  if (animation.import) {
    return animation.import;
  }

  try {
    animation.import = import(ANIMATIONS_SOURCE);

    return animation.import;
  } catch (error) {
    Debug.alert(`${error}`, 'error');
    return;
  }
};
