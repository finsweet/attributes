import type { SETTINGS } from '.';

export interface BeforeAfterSliderOptions {
  /**
   * The start position of the before and after slider component.
   */
  start?: string;
  /**
   * The before image for the before and after slider component.
   */
  before: HTMLElement;
  /**
   * The after image for the before and after slider component.
   */
  after: HTMLElement;
  /**
   * The handle for the before and after slider component.
   */
  dragHandle?: HTMLElement;
  /**
   * The mode of the before and after slider component.
   */
  interactionMode?: keyof typeof SETTINGS.mode.values;
}
