import { animations, type Easings, Interaction, type InteractionParams, isVisible } from '@finsweet/attributes-utils';

export type DisplayControllerParams = {
  element: HTMLElement;
  interaction?: InteractionParams;
  animation?: keyof typeof animations;
  startsHidden?: boolean;
  animationDuration?: number;
  animationEasing: Easings[number];
};

export const displayProperties = ['block', 'flex', 'grid', 'inline-block', 'inline'] as const;

export function createDisplayController({
  element,
  interaction,
  animation,
  startsHidden,
  animationDuration,
  animationEasing,
}: DisplayControllerParams) {
  let visible: boolean;

  if (startsHidden) {
    element.style.display = 'none';
    visible = false;
  } else {
    visible = isVisible(element);
  }

  let interactionInstance: Interaction | undefined;
  if (interaction) {
    const { element, duration } = interaction;
    interactionInstance = new Interaction({ element, duration });
  }

  const isElementVisible = (): boolean => visible;

  const show = async (): Promise<void> => {
    if (visible) return;

    const display = 'block';

    if (interactionInstance) {
      await interactionInstance.trigger('first');
    } else if (animation) {
      animations[animation].prepareIn(element, { display });
      await animations[animation].animateIn(element, { display, duration: animationDuration, easing: animationEasing });
    } else {
      element.style.display = display;
    }

    visible = true;
  };

  const hide = async (): Promise<void> => {
    if (!visible) return;

    if (interactionInstance) {
      await interactionInstance.trigger('second');
    } else if (animation) {
      await animations[animation].animateOut(element, {
        display: 'none',
        duration: animationDuration,
        easing: animationEasing,
      });
    } else {
      element.style.display = 'none';
    }

    visible = false;
  };

  return {
    element,
    isElementVisible,
    show,
    hide,
  };
}
