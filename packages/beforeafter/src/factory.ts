// import ImageSplitter from './components/ImageSplitter';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import type { BeforeAfterSliderOptions } from './utils';
import { DEFAULTS, type SETTINGS } from './utils/constants';

export const createBeforeAfterInstance = (
  wrapper: HTMLElement,
  beforeElement: HTMLElement,
  afterElement: HTMLElement,
  handleElement?: HTMLElement,
  modeOption?: 'drag' | 'hover',
  instanceIndex?: number
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
