import { AppSize } from '../types/ui.ts';
import { ViewStyle } from 'react-native';
import { EMPTY_SPACE, IS_ANDROID } from './common.ts';

export const sizes = {
  headerAccessoryWidth: 50,
  buttonHeight: 60,
  buttonBorderRadius: AppSize.xs,
  inputHeight: AppSize.xl,
  pickerItemSize: AppSize['3xl'],
  formFieldBorderRadius: AppSize.xs,
  outerPickerItemBorderRadius: AppSize.xs,
  innerPickerItemBorderRadius: AppSize.xxs,
  loaderSize: AppSize.ml,
  defaultBorderWidth: AppSize.xxs,
  silverPieceWidth: 36,
  silverPieceHeight: AppSize.xl,
  bigSilverPieceWidth: 21,
  bigSilverPieceHeight: 28,
  smallSilverPieceWidth: 13,
  smallSilverPieceHeight: 18,
  tinySilverPieceWidth: 9,
  tinySilverPieceHeight: 12,
  thinkingOwlWidth: 234,
  thinkingOwlHeight: 290,
  cardBorderRadius: AppSize.xs,
  settingsAvatarCardImageSize: 120,
  radioButtonInnerCircleRadius: 10,
  radioButtonOuterCircleRadius: 20,
  turnEvaluationRowMinHeight: 26,
  turnEvaluationNameColumn: 100,
  turnEvaluationAnswerColumn: 80,
  turnEvaluationMovementsColumn: 80,
  textShadowSizeHeader: 2,
  textShadowSizeContent: 1,
} as const satisfies Record<string, number>;

export const NON_PRESENT_VIEW_STYLE = {
  height: 0,
  width: 0,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
} as const satisfies ViewStyle;

export const GROW_SHRINK_STYLE: ViewStyle = { flexShrink: 1, flexGrow: 1 };

export const DISABLED_OPACITY = 0;
export const INACTIVE_OPACITY = 0.5;
export const ACTIVE_OPACITY = 1;

export const SPACE_ON_ANDROID_TO_PREVENT_TEXT_CUT = IS_ANDROID
  ? EMPTY_SPACE
  : undefined;
