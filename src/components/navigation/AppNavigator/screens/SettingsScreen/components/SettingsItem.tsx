import { JSX, memo } from 'react';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../constants/common.ts';
import { Pressable } from 'react-native';
import { getPressableOpacity } from '../../../../../controls/helpers/getPressableOpacity.ts';
import { getOnPressWithHapticFeedback } from '../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

const SETTINGS_ITEM_HEIGHT = 40;

export type SettingsItemProps = {
  title: string;
  description: string;
  accessoryRight: JSX.Element;
  onPress: () => void;
};

const SettingsItemComponent = ({
  title,
  description,
  accessoryRight,
  onPress,
}: SettingsItemProps) => (
  <Pressable
    onPress={getOnPressWithHapticFeedback(
      onPress,
      HapticFeedbackTypes.selection,
    )}>
    {({ pressed }) => {
      const opacity = getPressableOpacity({
        pressed,
        disabled: false,
      });

      return (
        <AppView
          opacity={opacity}
          gap={'s'}>
          <AppRow
            minHeight={SETTINGS_ITEM_HEIGHT}
            gap={'m'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <AppText category={'subHeader'}>{title}</AppText>
            {accessoryRight}
          </AppRow>
          <AppText
            category={'content'}
            colorStatus={'textMuted'}
            numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
            {description}
          </AppText>
        </AppView>
      );
    }}
  </Pressable>
);

export const SettingsItem = memo(SettingsItemComponent);
