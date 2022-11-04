import { Debug, isFormField } from '@finsweet/ts-utils';

import { getDecimalPrecision } from '$global/helpers';

import { ATTRIBUTES, getSelector, queryElement } from '../utils/constants';

/**
 * Constants
 */
const {
  min: { key: minKey },
  max: { key: maxKey },
  step: { key: stepKey },
  formatDisplay: { key: formatDisplayKey, values: formatDisplayValues },
  updateAction: { key: updateActionKey, values: updateActionValues },
} = ATTRIBUTES;

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
      formatValueDisplay: boolean;
      trackLeft: number;
      trackRight: number;
      trackWidth: number;
      minRange: number;
      maxRange: number;
      totalRange: number;
      step: number;
      precision: number;
      updateOnRelease: boolean;
    }
  | undefined => {
  const trackElement = queryElement<HTMLElement>('track', { operator: 'prefixed', scope: wrapperElement });

  const fillElement = queryElement<HTMLElement>('fill', { operator: 'prefixed', scope: wrapperElement });

  const inputElements = [...wrapperElement.querySelectorAll('input')].filter(isFormField);

  const handleElements = [
    ...wrapperElement.querySelectorAll<HTMLElement>(getSelector('element', 'handle', { operator: 'prefixed' })),
  ];

  const displayValueElements = [
    ...wrapperElement.querySelectorAll<HTMLElement>(getSelector('element', 'displayValue', { operator: 'prefixed' })),
  ];

  const formatValueDisplay = wrapperElement.getAttribute(formatDisplayKey) === formatDisplayValues.true;

  const updateOnRelease = wrapperElement.getAttribute(updateActionKey) === updateActionValues.release;

  if (!handleElements.length || !trackElement) {
    Debug.alert('The rangeslider is missing a Track element or a Handle element.', 'error');
    return;
  }

  const { left: trackLeft, right: trackRight } = trackElement.getBoundingClientRect();
  const trackWidth = trackElement.clientWidth;
  trackElement.style.position = 'relative';

  const minRange = parseFloat(wrapperElement.getAttribute(minKey) || '0');
  const maxRange = parseFloat(wrapperElement.getAttribute(maxKey) || `${minRange + 1}`);
  const totalRange = maxRange - minRange;

  if (Number.isNaN(totalRange)) {
    Debug.alert('Please make sure min and max are numbers.', 'error');
    return;
  }

  if (Math.sign(totalRange) === -1) {
    Debug.alert("The min can't be greater than the max.", 'error');
    return;
  }

  const step = parseFloat(wrapperElement.getAttribute(stepKey) || `${totalRange / 100}`);
  const precision = getDecimalPrecision(step);

  if (totalRange % step > 0)
    Debug.alert(
      `The provided step [${step}] doesn't fit the range [${minRange},${maxRange}], are you sure you want to use this value?`,
      'info'
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
  };
};
