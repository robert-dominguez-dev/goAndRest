import { JSX } from 'react';
import { AppRow } from '../../AppRow.tsx';
import { Pressable } from 'react-native';
import { getPressableOpacity } from '../../../controls/helpers/getPressableOpacity.ts';
import { getOnPressWithHapticFeedback } from '../../../controls/helpers/getOnPressWithHapticFeedback.ts';

import { AppIconName } from '../../AppIcon.tsx';
import {
  APP_BOTTOM_SHEET_ICON_LABEL_GAP_UNION,
  AppSelectionBottomSheetItemText,
  AppSelectionBottomSheetItemTextProps,
} from './AppSelectionBottomSheetItemText.tsx';
import { AppColorUnion } from '../../../../types/ui.ts';
import { PlaySoundIcon, PlaySoundIconProps } from './PlaySoundIcon.tsx';
import { CustomAnalyticsParams, logCustomEvent, } from '../../../navigation/helpers/logCustomEvent.ts';

export type AppSelectionBottomSheetItemData<TValue> =
  Partial<PlaySoundIconProps> & {
    label: string;
    value: TValue;
    accessoryLeft?: JSX.Element;
    accessoryLeftIconName?: AppIconName;
    accessoryLeftIconStatus?: AppColorUnion;
    accessoryLeftImageProps?: AppSelectionBottomSheetItemTextProps['imageProps'];
    selected?: boolean;
    disabled?: boolean;
    analytics?: CustomAnalyticsParams;
  };

export type AppSelectionBottomSheetItemProps<TValue> =
  AppSelectionBottomSheetItemData<TValue> & {
    onSelect: (value: TValue) => void;
  };

export const AppSelectionBottomSheetItem = <TValue,>({
  label,
  value,
  onSelect,
  selected,
  disabled,
  accessoryLeft,
  accessoryLeftIconName,
  accessoryLeftIconStatus,
  accessoryLeftImageProps,
  audioParams,
  analytics,
}: AppSelectionBottomSheetItemProps<TValue>) => {
  const handlePress = () => {
    if (analytics) {
      void logCustomEvent(analytics.eventName, analytics.eventParams);
    }

    onSelect(value);
  };

  const isPressDisabled: boolean = !!disabled || !!selected;

  const textColorStatus: AppColorUnion = selected ? 'selectedItem' : 'text';

  return (
    <Pressable
      onPress={getOnPressWithHapticFeedback(handlePress)}
      disabled={isPressDisabled}>
      {({ pressed }) => {
        const opacity = getPressableOpacity({
          pressed,
          disabled,
        });

        return (
          <AppRow
            opacity={opacity}
            paddingVertical={'m'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <AppRow
              gap={APP_BOTTOM_SHEET_ICON_LABEL_GAP_UNION}
              alignItems={'center'}>
              {accessoryLeft}
              <AppSelectionBottomSheetItemText
                label={label}
                iconName={accessoryLeftIconName}
                iconColorStatus={accessoryLeftIconStatus}
                imageProps={accessoryLeftImageProps}
                textColorStatus={textColorStatus}
              />
            </AppRow>
            {audioParams && <PlaySoundIcon audioParams={audioParams} />}
          </AppRow>
        );
      }}
    </Pressable>
  );
};
