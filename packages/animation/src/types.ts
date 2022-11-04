import type { MotionKeyframesDefinition } from '@motionone/dom';
import type { AnimationOptions } from '@motionone/types';

import type { easings } from './functions';

export interface AnimationProps {
  keyframes: MotionKeyframesDefinition;
  initialStyles: {
    [key: string]: string;
  };
}

type FilteredAnimationOptions = Pick<AnimationOptions, 'duration' | 'easing'> & { stagger?: number };

type AnimationPrepare<T> = (element: HTMLElement | HTMLElement[], options?: T) => void;
type AnimationBase<T> = (element: HTMLElement | HTMLElement[], options?: T & FilteredAnimationOptions) => Promise<void>;

type PrepareProps = { target?: Element; insertAfter?: Node | null; display?: string };
type AnimationInProps = PrepareProps & { prepared?: true };
type AnimationOutProps = PrepareProps & { remove?: boolean };

type PrepareIn = AnimationPrepare<PrepareProps>;

type AnimationIn = AnimationBase<AnimationInProps>;
type AnimationOut = AnimationBase<AnimationOutProps>;

export type AnimationFunctions = { prepareIn: PrepareIn; animateIn: AnimationIn; animateOut: AnimationOut };
export type Animation = AnimationFunctions & { options?: FilteredAnimationOptions };

export type AnimationsObject = Readonly<
  Record<
    'fade' | 'slide-up' | 'slide-down' | 'slide-right' | 'slide-left' | 'grow' | 'shrink' | 'spin',
    AnimationFunctions
  >
>;

export type Easings = typeof easings;

export type AnimationModule = {
  animations: AnimationsObject;
  easings: Easings;
};

export type AnimationImport = Promise<AnimationModule | undefined>;
