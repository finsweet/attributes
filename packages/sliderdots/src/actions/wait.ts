import { SliderNavElement, SLIDER_CSS_CLASSES } from '@finsweet/ts-utils';

/**
 * Returns a Promise that resolves when all slider dots have been initially populated.
 * Helpful when waiting for `cmsslider` to be ready before initing `sliderdots`.
 * It has a maximum timeout of 500ms.
 *
 * @param sliderNav The original `Slider Nav`.
 */
export const waitSliderReady = (sliderNav: SliderNavElement) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 500);

    const callback: MutationCallback = (mutations) => {
      for (const { addedNodes } of mutations) {
        for (const addedNode of addedNodes) {
          const isSliderDot = addedNode instanceof Element && addedNode.closest(`.${SLIDER_CSS_CLASSES.sliderDot}`);
          if (!isSliderDot) continue;

          resolve(undefined);
          observer.disconnect();
          break;
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(sliderNav, { childList: true });
  });
};
