import { workoutSettingsButtonConfigMap } from '../../../constants.ts';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { WorkoutConfigButtonProps } from '../../../types.ts';
import { Pressable } from 'react-native';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { getPressableOpacity } from '../../../../../../../controls/helpers/getPressableOpacity.ts';
import { sizes } from '../../../../../../../../constants/ui.ts';
import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { AppRow } from '../../../../../../../common/AppRow.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../../../constants/common.ts';
import { WorkoutConfigButtonValue } from './WorkoutConfigButtonValue.tsx';
import { useGetTabletScaledNumber } from '../../../../../../../../hooks/useGetTabletScaledNumber.ts';
import { AppSize } from '../../../../../../../../types/ui.ts';

const { configButtonSize, configButtonBorderRadius } = sizes;

const WorkoutConfigVerticalButtonComponent = ({
  control,
  name,
  onPress,
  disabled,
}: WorkoutConfigButtonProps) => {
  const t = useAppTranslation();

  const getTabletScaledNumber = useGetTabletScaledNumber();

  const width = getTabletScaledNumber(configButtonSize);
  const borderRadius = getTabletScaledNumber(configButtonBorderRadius);
  const labelFontSize = getTabletScaledNumber(16);
  const paddingTop = getTabletScaledNumber(AppSize.s);
  const paddingBottom = getTabletScaledNumber(AppSize.xs);

  const value = useWatch({
    control,
    name,
  });

  const { labelKey, backgroundColorStatus, valueFormatter } =
    workoutSettingsButtonConfigMap[name];

  const formattedValue = valueFormatter(value);

  return (
    <Pressable
      onPress={getOnPressWithHapticFeedbackConditionally(onPress)}
      disabled={disabled}>
      {({ pressed }) => {
        const opacity = getPressableOpacity({
          disabled,
          pressed,
        });

        return (
          <AppView
            grow
            opacity={opacity}
            width={width}
            borderRadius={borderRadius}
            backgroundColorStatus={backgroundColorStatus}
            paddingHorizontal={'xs'}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <AppRow>
              <AppText
                textAlign={'center'}
                category={'title'}
                fontSizeOverride={labelFontSize}
                numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
                {t(labelKey).toUpperCase()}
              </AppText>
            </AppRow>
            <AppRow>
              <WorkoutConfigButtonValue value={formattedValue} />
            </AppRow>
          </AppView>
        );
      }}
    </Pressable>
  );
};

export const WorkoutConfigVerticalButton = memo(
  WorkoutConfigVerticalButtonComponent,
);
