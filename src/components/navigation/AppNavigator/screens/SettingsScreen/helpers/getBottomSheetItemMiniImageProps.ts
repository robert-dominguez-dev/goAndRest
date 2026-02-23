import { SettingValueProps } from '../types.ts';
import {
  AppIllustration,
  appIllustrationToAspectRatio,
} from '../../../../../../assets/constants.ts';

const BOTTOM_SHEET_ITEM_ICON_SIZE = 24;

const countWidth = (ratio: number) => BOTTOM_SHEET_ITEM_ICON_SIZE * ratio;

export const getBottomSheetItemMiniImageProps = (
  illustrationName: AppIllustration,
): SettingValueProps['imageProps'] => ({
  illustrationName,
  height: BOTTOM_SHEET_ITEM_ICON_SIZE,
  width: countWidth(appIllustrationToAspectRatio[illustrationName]),
});
