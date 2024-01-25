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
    element.setAttribute('fs-consent-cloak', '');

    visible = false;
  } else {
    visible = isVisible(element);
    element.removeAttribute('fs-consent-cloak');
  }

  let interactionInstance: Interaction | undefined;
  if (interaction) {
    const { element, duration } = interaction;
    interactionInstance = new Interaction({ element, duration });
  }

  const isElementVisible = (): boolean => visible;

  const show = async (): Promise<void> => {
    if (visible) return;

    if (interactionInstance) {
      await interactionInstance.trigger('first');
    } else if (animation) {
      animations[animation].prepareIn(element);

      element.removeAttribute('fs-consent-cloak');

      await animations[animation].animateIn(element, { duration: animationDuration, easing: animationEasing });
    } else {
      element.removeAttribute('fs-consent-cloak');
    }

    visible = true;
  };

  const hide = async (): Promise<void> => {
    if (!visible) return;

    if (interactionInstance) {
      await interactionInstance.trigger('second');
    } else if (animation) {
      await animations[animation].animateOut(element, {
        duration: animationDuration,
        easing: animationEasing,
      });

      element.setAttribute('fs-consent-cloak', '');
    } else {
      element.setAttribute('fs-consent-cloak', '');
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
