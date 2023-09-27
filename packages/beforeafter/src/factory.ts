// import ImageSplitter from './components/ImageSplitter';
import { BeforeAfterSlider, type OptionsType } from './components/BeforeAfterSlider';
import type { SETTINGS } from './utils/constants';

export const createBeforeAfterInstance = (
  wrapper: HTMLElement,
  beforeElement: HTMLElement,
  afterElement: HTMLElement,
  handleElement?: HTMLElement | null,
  modeOption?: 'drag' | 'hover',
  instanceIndex?: number
) => {
  const options: OptionsType = {
    beforeElement,
    afterElement,
    handleElement,
  };

  console.log('new BeforeAfterSlider');
  const imageSplitter = new BeforeAfterSlider(wrapper, options);
  imageSplitter.init();
  console.log('finished initting...');

  return imageSplitter;
};
