// import ImageSplitter from './components/ImageSplitter';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import type { BeforeAfterSliderOptions } from './utils';
import { DEFAULTS } from './utils/constants';

/**
 * Creates an instance of the image splitter.
 * @param wrapper - The wrapper element.
 * @param beforeElement - The before element.
 * @param afterElement - The after element.
 * @param handleElement - The handle element.
 * @param modeOption - The interaction mode.
 * @returns The image splitter instance.
 */
export const createBeforeAfterInstance = (
  wrapper: HTMLElement,
  beforeElement: HTMLElement,
  afterElement: HTMLElement,
  handleElement?: HTMLElement,
  modeOption?: 'drag' | 'hover'
) => {
  const options: BeforeAfterSliderOptions = {
    before: beforeElement,
    after: afterElement,
    dragHandle: handleElement,
    interactionMode: modeOption || DEFAULTS.mode,
  };

  const imageSplitter = new BeforeAfterSlider(wrapper, options);
  imageSplitter.init();

  return imageSplitter;
};
