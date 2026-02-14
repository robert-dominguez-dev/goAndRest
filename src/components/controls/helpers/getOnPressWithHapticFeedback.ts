import { triggerHapticFeedback } from './triggerHapticFeedback.ts';

export type OnPressHandler<TParams> = (params: TParams) => void;

export const getOnPressWithHapticFeedback =
  <TParams>(onPress: OnPressHandler<TParams>) =>
  (params: TParams) => {
    triggerHapticFeedback();
    onPress(params);
  };
