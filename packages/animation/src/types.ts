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

type PrepareInProps = { target?: Element; insertAfter?: Element | null };
type AnimationInProps = PrepareInProps & { prepared?: true };

type PrepareIn = AnimationPrepare<PrepareInProps>;

type AnimationIn = AnimationBase<AnimationInProps>;
type AnimationOut = AnimationBase<{ remove?: boolean }>;

export type AnimationFunctions = { prepareIn: PrepareIn; animateIn: AnimationIn; animateOut: AnimationOut };
export type Animation = AnimationFunctions & { options?: FilteredAnimationOptions };

export type AnimationsObject = Readonly<
  Record<
    'fade' | 'slide-up' | 'slide-down' | 'slide-right' | 'slide-left' | 'grow' | 'shrink' | 'spin',
    AnimationFunctions
  >
>;

export type Easings = typeof easings;

export type AnimationImport = Promise<
  | {
      animations: AnimationsObject;
      easings: Easings;
    }
  | undefined
>;
