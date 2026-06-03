import { SettingValueProps } from '../types.ts';
import {
  appFeedbackEntityToImageAspectRatio,
  AppIllustrationName,
} from '../../../../../../assets/constants/common.ts';

const BOTTOM_SHEET_ITEM_ICON_SIZE = 24;

export const getBottomSheetItemMiniImageProps = (
  illustrationName: AppIllustrationName,
  size = BOTTOM_SHEET_ITEM_ICON_SIZE,
): SettingValueProps['imageProps'] => {
  const countWidth = (ratio: number) => size * ratio;

  return {
    illustrationName,
    height: size,
    width: countWidth(appFeedbackEntityToImageAspectRatio[illustrationName]),
  };
};
