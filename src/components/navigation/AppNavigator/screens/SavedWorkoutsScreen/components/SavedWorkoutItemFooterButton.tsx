import {
  AppView,
  AppViewProps,
} from '../../../../../common/AppView/AppView.tsx';
import { Pressable } from 'react-native';
import { AppRow } from '../../../../../common/AppRow.tsx';
import {
  AppIconAndLabel,
  AppIconAndLabelProps,
} from '../../../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { getPressableOpacity } from '../../../../../controls/helpers/getPressableOpacity.ts';
import { getOnPressWithHapticFeedback } from '../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';

export type SavedWorkoutItemFooterButtonProps = Pick<
  AppViewProps,
  'backgroundColorStatus'
> &
  Pick<AppIconAndLabelProps, 'label' | 'iconName'> & {
    onPress: () => void;
  };

export const SavedWorkoutItemFooterButton = ({
  label,
  iconName,
  onPress,
  backgroundColorStatus,
}: SavedWorkoutItemFooterButtonProps) => {
  return (
    <Pressable
      onPress={getOnPressWithHapticFeedback(onPress)}
      style={{ flex: 1, flexBasis: 0 }}>
      {({ pressed }) => {
        const opacity = getPressableOpacity({
          pressed,
          disabled: false,
        });

        return (
          <AppView
            grow
            flexBasis={0}
            paddingHorizontal={'m'}
            paddingVertical={'xs'}
            opacity={opacity}
            backgroundColorStatus={backgroundColorStatus}>
            <AppView
              grow
              alignItems={'center'}
              justifyContent={'center'}>
              <AppRow
                shrink
                gap={'s'}
                alignItems={'center'}
                justifyContent={'center'}>
                <AppIconAndLabel
                  grow={false}
                  category={'subHeader'}
                  iconName={iconName}
                  label={label.toUpperCase()}
                />
              </AppRow>
            </AppView>
          </AppView>
        );
      }}
    </Pressable>
  );
};
