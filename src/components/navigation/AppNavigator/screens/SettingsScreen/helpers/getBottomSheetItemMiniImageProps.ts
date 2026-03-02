import { SettingValueProps } from '../types.ts';
import {
  appFeedbackEntityToImageAspectRatio,
  AppIllustrationName,
} from '../../../../../../assets/constants/common.ts';

const BOTTOM_SHEET_ITEM_ICON_SIZE = 24;

const countWidth = (ratio: number) => BOTTOM_SHEET_ITEM_ICON_SIZE * ratio;

export const getBottomSheetItemMiniImageProps = (
  illustrationName: AppIllustrationName,
): SettingValueProps['imageProps'] => ({
  illustrationName,
  height: BOTTOM_SHEET_ITEM_ICON_SIZE,
  width: countWidth(appFeedbackEntityToImageAspectRatio[illustrationName]),
});
