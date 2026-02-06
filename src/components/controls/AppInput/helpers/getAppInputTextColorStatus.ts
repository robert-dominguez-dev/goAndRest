import { AppColorUnion } from '../../../../types/ui.ts';

export type GetAppInputTextColorStatusParams = {
  isInvalid?: boolean;
  disabled: boolean;
};

export const getAppInputTextColorStatus = ({
  isInvalid,
  disabled,
}: GetAppInputTextColorStatusParams): AppColorUnion => {
  if (isInvalid) {
    return 'negative';
  }

  if (disabled) {
    return 'backgroundAlt';
  }

  return 'background';
};
