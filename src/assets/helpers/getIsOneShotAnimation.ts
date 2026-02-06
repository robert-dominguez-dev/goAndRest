import { AppAnimation } from '../constants.ts';

export const oneShotAppAnimations = [
  AppAnimation.confetti,
] satisfies AppAnimation[];

type OneShotAppAnimationUnion = (typeof oneShotAppAnimations)[number];

export const appAnimationToDuration: Record<OneShotAppAnimationUnion, number> =
  {
    [AppAnimation.confetti]: 3500,
  };

export const getIsOneShotAnimation = (
  animationName: string,
): animationName is OneShotAppAnimationUnion =>
  oneShotAppAnimations.some(name => name === animationName);
