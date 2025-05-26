import { getDecimalPrecision, isFormField } from '@finsweet/attributes-utils';

import { getAttribute, hasAttributeValue, queryAllElements, queryElement } from '../utils/selectors';

/**
 * Collects the required settings.
 * @param wrapperElement The wrapper element.
 * @returns The settings, if no errors were found.
 */
export const getSettings = (
  wrapperElement: HTMLElement
):
  | {
      trackElement: HTMLElement;
      fillElement: HTMLElement | null;
      handleElements: HTMLElement[];
      inputElements: HTMLInputElement[];
      displayValueElements: HTMLElement[];
      formatValueDisplay?: string;
      trackLeft: number;
      trackRight: number;
      trackWidth: number;
      minRange: number;
      maxRange: number;
      totalRange: number;
      step: number;
      precision: number;
      updateOnRelease: boolean;
      isLazy: boolean;
    }
  | undefined => {
  const trackElement = queryElement('track', { scope: wrapperElement });

  const fillElement = queryElement('fill', { scope: wrapperElement });

  const inputElements = [...wrapperElement.querySelectorAll('input')].filter(isFormField);

  const handleElements = queryAllElements('handle', { scope: wrapperElement });

  const displayValueElements = queryAllElements('display-value', { scope: wrapperElement });

  const formatValueDisplay = getAttribute(wrapperElement, 'formatdisplay');

  const updateOnRelease = hasAttributeValue(wrapperElement, 'update', 'release');

  const isLazy = hasAttributeValue(wrapperElement, 'lazy', 'true');

  if (!handleElements.length || !trackElement) {
    console.error('The rangeslider is missing a Track element or a Handle element.');
    return;
  }

  const { left: trackLeft, right: trackRight } = trackElement.getBoundingClientRect();
  const trackWidth = trackElement.clientWidth;
  trackElement.style.position = 'relative';

  const minRange = parseFloat(getAttribute(wrapperElement, 'min') || '0');
  const maxRange = parseFloat(getAttribute(wrapperElement, 'max') || `${minRange + 1}`);
  const totalRange = maxRange - minRange;

  if (Number.isNaN(totalRange)) {
    console.error('Please make sure min and max are numbers.');
    return;
  }

  if (Math.sign(totalRange) === -1) {
    console.error("The min can't be greater than the max.");
    return;
  }

  const step = parseFloat(getAttribute(wrapperElement, 'step') || `${totalRange / 100}`);
  const precision = getDecimalPrecision(step);

  if (totalRange % step > 0)
    console.error(
      `The provided step [${step}] doesn't fit the range [${minRange},${maxRange}], are you sure you want to use this value?`
    );

  return {
    trackElement,
    fillElement,
    handleElements,
    inputElements,
    displayValueElements,
    formatValueDisplay,
    trackLeft,
    trackRight,
    trackWidth,
    minRange,
    maxRange,
    totalRange,
    step,
    precision,
    updateOnRelease,
    isLazy,
  };
};
