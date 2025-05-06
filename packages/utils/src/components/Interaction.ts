import { simulateEvent } from '../helpers';
import { wait } from '../helpers/wait';

// Types
export interface InteractionParams {
  /**
   * The element that has a Webflow Ix2 Click interaction binded to it.
   */
  element: HTMLElement | string;

  /**
   * The duration of the interaction.
   * If a single number is passed, it will be used for both first and second interactions.
   * If an object is passed, you can specify the duration for each interaction.
   */
  duration?: number | Partial<Interaction['duration']>;
}

export class Interaction {
  private readonly element: HTMLElement;
  private active = false;
  private running = false;
  private runningPromise?: Promise<unknown>;

  public readonly duration: {
    first: number;
    second: number;
  };

  /**
   * Acts as the controller for a Webflow Interaction.
   * It accepts an element that will be clicked when required (firing a Mouse Click interaction).
   * @param element Element that has the Mouse Click interaction.
   * @param duration Optionally, the duration can be explicitly set so the trigger methods will return an awaitable Promise.
   */
  constructor({ element, duration }: InteractionParams) {
    this.element = typeof element === 'string' ? document.querySelector<HTMLElement>(element)! : element;

    this.duration = {
      first: typeof duration === 'number' ? duration : (duration?.first ?? 0),
      second: typeof duration === 'number' ? duration : (duration?.second ?? 0),
    };
  }

  /**
   * Trigger the interaction
   * @param click Perform first or second click
   * @returns True if the interaction was fired
   */
  public async trigger(click?: 'first' | 'second'): Promise<boolean> {
    if ((click === 'first' && this.active) || (click === 'second' && !this.active)) return false;
    if (!click) click = this.active ? 'second' : 'first';

    simulateEvent(this.element, 'click');

    this.running = true;
    this.runningPromise = wait(this.duration[click]);
    await this.runningPromise;
    this.running = false;

    this.active = click === 'first';
    return true;
  }

  /**
   * @returns If the interaction is active
   */
  public isActive = (): boolean => this.active;

  /**
   * @returns If the interaction is running
   */
  public isRunning = (): boolean => this.running;

  /**
   * @returns A promise that fulfills when the current running interaction has finished
   */
  public untilFinished = (): Promise<unknown> | undefined => this.runningPromise;
}
