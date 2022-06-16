import { setFormFieldValue } from '@finsweet/ts-utils';
import { ARIA_VALUEMAX_KEY, ARIA_VALUEMIN_KEY, ARIA_VALUENOW_KEY } from '@global/constants/a11ty';

import { setHandleA11ty } from '../actions/a11ty';
import { setHandleStyles } from '../actions/styles';
import { adjustValueToStep } from '../actions/values';
import { HANDLE_INCREMENT_KEYS, HANDLE_KEYS } from '../utils/constants';
import type { Fill } from './Fill';

export class Handle {
  private readonly index;
  private readonly minRange;
  private readonly maxRange;
  private readonly totalRange;
  private readonly step;
  private readonly precision;

  private readonly inputElement;
  private readonly displayValueElement;
  private readonly formatValueDisplay;

  private fill?: Fill;
  private sibling?: Handle;

  private trackWidth;

  private currentValue!: number;
  private minValue;
  private maxValue;

  private updatingInput = false;

  constructor(
    public readonly element: HTMLElement,
    {
      index,
      minRange,
      maxRange,
      trackWidth,
      step,
      precision,
      startValue,
      inputElement,
      displayValueElement,
      formatValueDisplay,
    }: {
      index: number;
      minRange: number;
      maxRange: number;
      trackWidth: number;
      step: number;
      precision: number;
      startValue: number;
      inputElement?: HTMLInputElement;
      displayValueElement?: HTMLElement;
      formatValueDisplay: boolean;
    }
  ) {
    this.inputElement = inputElement;
    this.displayValueElement = displayValueElement;
    this.formatValueDisplay = formatValueDisplay;

    this.index = index;
    this.minRange = minRange;
    this.maxRange = maxRange;
    this.totalRange = maxRange - minRange;
    this.step = step;
    this.precision = precision;

    this.minValue = minRange;
    this.maxValue = maxRange;

    this.trackWidth = trackWidth;

    setHandleStyles(element);
    setHandleA11ty(element, inputElement);

    this.setValue(startValue);
    this.listenEvents();
  }

  /**
   * Listens for internal events.
   */
  private listenEvents() {
    const { element, inputElement } = this;

    element.addEventListener('keydown', (e) => this.handleKeyDown(e));
    inputElement?.addEventListener('change', () => this.handleInputChange());
  }

  /**
   * Handles when the keyboard is used when focusing the Handle.
   * @param e A `keydown` event.
   */
  private handleKeyDown(e: KeyboardEvent) {
    const { step, currentValue } = this;
    const { key } = e;

    if (!HANDLE_KEYS.includes(key)) return;

    e.preventDefault();

    if (HANDLE_INCREMENT_KEYS.includes(key)) this.setValue(currentValue + step);
    else this.setValue(currentValue - step);
  }

  /**
   * Handles when the value of the `<input>` element is updated by third party actions.
   */
  private handleInputChange() {
    const { inputElement, index, minRange, maxRange, step, precision, updatingInput } = this;
    if (!inputElement || updatingInput) return;

    const { value } = inputElement;

    const numericValue = parseFloat(value);

    if (numericValue) {
      this.setValue(adjustValueToStep(numericValue, step, precision));

      return;
    }

    this.setValue(index === 0 ? minRange : maxRange, false);
  }

  /**
   * Updates the Handle's position on the track.
   */
  private updatePosition() {
    const { currentValue, element, trackWidth, minRange, totalRange, fill } = this;

    const left = ((currentValue - minRange) * trackWidth) / totalRange;

    element.style.left = `${left}px`;

    fill?.update();
  }

  /**
   * @returns The current value of the Handle.
   */
  public getValue = (): number => this.currentValue;

  /**
   * Sets a new value to the Handle.
   * The Handle's position is automatically updated based on the new value.
   * @param newValue The new value to set.
   * @param updateInputElement Defines if the `<input>` element should be updated. Defaults to `true`.
   *
   * @returns `true` if the current value was updated.
   */
  public setValue(newValue: number, updateInputElement = true): boolean {
    const { currentValue, element, minValue, maxValue, displayValueElement, formatValueDisplay } = this;

    if (currentValue === newValue || newValue < minValue || newValue > maxValue) return false;

    this.currentValue = newValue;

    this.updatePosition();
    this.updateSiblingConstraints();

    const stringValue = `${newValue}`;
    const localeStringValue = newValue.toLocaleString();

    element.setAttribute(ARIA_VALUENOW_KEY, stringValue);

    if (displayValueElement) displayValueElement.textContent = formatValueDisplay ? localeStringValue : stringValue;

    if (updateInputElement) this.updateInputElement();

    return true;
  }

  /**
   * Updates the input element's value.
   */
  public updateInputElement() {
    this.updatingInput = true;

    const { currentValue, inputElement } = this;

    if (!inputElement) return;

    setFormFieldValue(inputElement, `${currentValue}`);

    this.updatingInput = false;
  }

  /**
   * @returns The Handle's constraints.
   */
  public getConstraints = (): [number, number] => [this.minValue, this.maxValue];

  /**
   * Sets new constraints to the Handle.
   * @param minValue The new minimum value.
   * @param maxValue The new maximum value.
   */
  public setConstraints(minValue: number, maxValue: number): void {
    const { element } = this;

    element.setAttribute(ARIA_VALUEMIN_KEY, `${minValue}`);
    element.setAttribute(ARIA_VALUEMAX_KEY, `${maxValue}`);

    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  /**
   * Updates the sibling's constaints, if existing.
   */
  public updateSiblingConstraints() {
    const { index, sibling, step, minRange, maxRange, currentValue } = this;

    if (!sibling) return;

    if (index === 0) sibling.setConstraints(currentValue + step, maxRange);
    else sibling.setConstraints(minRange, currentValue - step);
  }

  /**
   * Updates the stored track width and the Handle's position on the track.
   * @param newTrackWidth The new track width.
   */
  public updateTrackWidth(newTrackWidth: number) {
    this.trackWidth = newTrackWidth;

    this.fill?.updateTrackWidth(newTrackWidth);
    this.updatePosition();
  }

  /**
   * Adds a `Fill` instance to the Handle.
   * @param fill A {@link Fill} instance.
   */
  public addFill(fill: Fill) {
    this.fill = fill;
  }

  /**
   * Adds a sibling Handle.
   * @param sibling A {@link Handle} instance.
   */
  public addSibling(sibling: Handle) {
    this.sibling = sibling;

    this.updateSiblingConstraints();
  }
}
