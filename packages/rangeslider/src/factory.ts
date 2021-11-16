import { Debug, isNotEmpty } from '@finsweet/ts-utils';
import { ATTRIBUTES } from './constants';
import { Fill } from './Fill';
import { Handle } from './Handle';
import { adjustValueToStep } from './values';

import type { getSettings } from './settings';
import type { HandleInstances } from './types';

/**
 * Creates {@link Handle} instances and sets them up.
 * @param settings The settings returned by {@link getSettings}.
 * @returns The new {@link Handle} instances.
 */
export const createHandleInstances = ({
  handleElements,
  inputElements,
  displayValueElements,
  formatValueDisplay,
  minRange,
  maxRange,
  trackWidth,
  step,
}: NonNullable<ReturnType<typeof getSettings>>): HandleInstances | undefined => {
  const handles = handleElements
    .slice(0, 2)
    .map((handleElement, index) => {
      const rawStartValue = parseFloat(
        handleElement.getAttribute(ATTRIBUTES.start.key) || `${index === 0 ? minRange : maxRange}`
      );

      let startValue = adjustValueToStep(rawStartValue, step);

      const inputElement = inputElements[index];
      const displayValueElement = displayValueElements[index];

      if (startValue < minRange) {
        Debug.alert(
          `The Handle start value [${startValue}] doesn't match the range, so it has been set to the min value [${minRange}].`,
          'info'
        );
        startValue = minRange;
      }

      if (startValue > maxRange) {
        Debug.alert(
          `The Handle start value [${startValue}] doesn't match the range, so it has been set to the max value [${maxRange}].`,
          'info'
        );
        startValue = maxRange;
      }

      const handle = new Handle(handleElement, {
        index,
        minRange,
        maxRange,
        trackWidth,
        step,
        startValue,
        inputElement,
        displayValueElement,
        formatValueDisplay,
      });

      return handle;
    })
    .filter(isNotEmpty);

  if (!handles.length) return;

  // Sort them by start value
  if (handles.length > 1) handles.sort((handle1, handle2) => handle1.getValue() - handle2.getValue());

  const [handle1, handle2] = handles;

  // Add relationships
  if (handle2) {
    handle1.addSibling(handle2);
    handle2.addSibling(handle1);
  } else handle1.setConstraints(minRange, maxRange);

  return [handle1, handle2];
};

/**
 * Creates a `Fill` instance and adds it to the Handles.
 * @param settings The settings returned by {@link getSettings}.
 * @param handles The {@link HandleInstances} tuple.
 * @returns
 */
export const createFillInstance = (
  { fillElement, minRange, maxRange, trackWidth }: NonNullable<ReturnType<typeof getSettings>>,
  handles: HandleInstances
) => {
  if (!fillElement) return;

  const fill = new Fill(fillElement, { minRange, maxRange, trackWidth, handles });
  const [handle1, handle2] = handles;

  handle1.addFill(fill);
  handle2?.addFill(fill);
};
