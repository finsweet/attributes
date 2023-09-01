import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initSlider } from './actions/slider';
import { queryAllElements } from './utils';
import { swiperInstancesStore } from './utils';

/**
 * Inits the slider attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const sliderElements = queryAllElements<HTMLElement>('slider');

  sliderElements
    .map((element) => (element.getAttribute('role') === 'list' ? (element.parentElement as HTMLElement) : element))
    .forEach((element) => initSlider(element));

  return {
    result: swiperInstancesStore,
    destroy() {
      for (const [, swiperInstance] of swiperInstancesStore) {
        swiperInstance.destroy();
      }

      swiperInstancesStore.clear();
    },
  };
};
