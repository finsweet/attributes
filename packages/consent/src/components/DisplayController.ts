import { animations, Interaction, type InteractionParams, isVisible } from '@finsweet/attributes-utils';

// Types
export interface DisplayControllerParams {
  /**
   * The main element. Accepts both an HTMLElement or a string selector.
   */
  element: HTMLElement;

  /**
   * If the display must be controlled through a Webflow interaction.
   */
  interaction?: InteractionParams;

  /**
   * The display property of the element when displayed.
   * Not applicable when interaction parameters ara passed to the instance, as it's assumed that the Webflow interaction will set the display property.
   * Defaults to `block`.
   */
  displayProperty?: (typeof DisplayController)['displayProperties'][number];

  /**
   * Defines a custom animation to be used when showing/hiding the element.
   */
  animation?: keyof typeof animations;

  /**
   * If set to true, the element will be set to `display: none`.
   */
  startsHidden?: boolean;
}

/**
 * Controls showing/hiding an element.
 * Works with Webflow interactions, built-in fade animations or no animations at all.
 */
export class DisplayController {
  private readonly interaction;
  private readonly animation;
  private readonly displayProperty: Required<DisplayControllerParams>['displayProperty'];
  private visible;

  public readonly element: HTMLElement;
  public static readonly displayProperties = ['block', 'flex', 'grid', 'inline-block', 'inline'] as const;

  constructor({ element, interaction, displayProperty, animation, startsHidden }: DisplayControllerParams) {
    // Store properties
    this.element = element;
    this.animation = animation;
    this.displayProperty = displayProperty || 'block';

    // Visibility check
    if (startsHidden) {
      this.element.style.display = 'none';
      this.visible = false;
    } else this.visible = isVisible(this.element);

    if (interaction) {
      const { element, duration } = interaction;
      this.interaction = new Interaction({ element, duration });
    }
  }

  /**
   * @returns If the element is visible
   */
  public isVisible = (): boolean => this.visible;

  /**
   * Displays the element
   * @returns An awaitable promise
   */
  public async show(): Promise<void> {
    if (this.visible) return;

    const { interaction, animation, element, displayProperty: display } = this;

    // Interaction
    if (interaction) {
      await interaction.trigger('first');
    }
    // Animation
    else if (animation) {
      animations[animation].prepareIn(element, { display });
      await animations[animation].animateIn(element, { display });
    }
    // No interaction or animation
    else {
      element.style.display = display;
    }

    this.visible = true;
  }

  /**
   * Hides the element
   * @returns An awaitable promise
   */
  public async hide(): Promise<void> {
    if (!this.visible) return;

    const { interaction, animation, element } = this;

    // Interaction
    if (interaction) {
      await interaction.trigger('second');
    }
    // Animation
    else if (animation) {
      await animations[animation].animateOut(element, { display: 'none' });
    }
    // No interaction or animation
    else {
      element.style.display = 'none';
    }

    this.visible = false;
  }
}
