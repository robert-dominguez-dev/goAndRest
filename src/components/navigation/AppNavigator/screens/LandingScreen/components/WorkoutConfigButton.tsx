import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../constants.ts';
import { memo } from 'react';
import { AppButton } from '../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { Control, Controller, useWatch } from 'react-hook-form';
import { AppBottomSheet } from '../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { useIsVisible } from '../../../../../common/AppBottomSheet/hooks/useIsVisible.ts';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppCircularSlider } from '../../../../../controls/AppCircularSlider/AppCircularSlider.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getOnPressWithHapticFeedback } from '../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { AppRoundedButton } from '../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { Check, X } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { AppSize } from '../../../../../../types/ui.ts';
import { roundedButtonToIconSize } from '../../../../../controls/AppRoundedButton/constants.ts';

const SLIDER_RADIUS = 160;

type WorkoutConfigButtonProps = {
  name: AppWorkoutConfigKey;
  control: Control<AppWorkout>;
};

const _WorkoutConfigButton = ({ name, control }: WorkoutConfigButtonProps) => {
  const t = useAppTranslation();

  const { text, backgroundAlt } = useAppThemedColors();

  const { isVisible, handleOpen, handleClose } = useIsVisible();

  const value = useWatch({
    control,
    name,
  });

  const {
    labelKey,
    descriptionKey,
    backgroundColorStatus,
    IconComponent,
    min,
    max,
    step,
    labelEveryNSteps,
    valueFormatter,
  } = workoutSettingsButtonConfigMap[name];

  const label = t(labelKey);
  const description = t(descriptionKey);

  const valueFormatted = valueFormatter(value);

  const bottomSheetContent = (
    <AppView
      gap={'l'}
      paddingBottom={'m'}
      alignItems={'center'}>
      <AppText numberOfLines={0}>{description}</AppText>
      <AppText
        category={'header'}
        textAlign={'center'}
        fontSizeOverride={'xxl'}>
        {valueFormatted}
      </AppText>
      <GestureHandlerRootView>
        <Controller
          control={control}
          name={name}
          render={({ field }) => {
            return (
              <AppCircularSlider
                radius={SLIDER_RADIUS}
                strokeWidth={AppSize.l}
                minValue={min}
                maxValue={max}
                step={step}
                filledTrackColor={backgroundAlt}
                labelEveryNSteps={labelEveryNSteps}
                valueFormatter={valueFormatter}
                value={field.value}
                onChange={getOnPressWithHapticFeedback(field.onChange)}
                thumbElement={
                  <AppRoundedButton
                    size={'xs'}
                    status={'grayscale'}>
                    <AppView />
                  </AppRoundedButton>
                }>
                <AppRoundedButton
                  onPress={handleClose}
                  status={'primary'}
                  size={'m'}>
                  <Check
                    size={roundedButtonToIconSize.m}
                    color={text}
                  />
                </AppRoundedButton>
              </AppCircularSlider>
            );
          }}
        />
      </GestureHandlerRootView>
    </AppView>
  );

  return (
    <>
      <AppButton
        label={label}
        value={valueFormatted}
        backgroundColorStatus={backgroundColorStatus}
        IconComponent={IconComponent}
        onPress={handleOpen}
      />
      <AppBottomSheet
        closeable
        scrollable={false}
        isVisible={isVisible}
        bottomSheetTitle={label}
        bottomSheetContent={bottomSheetContent}
        backgroundColorStatus={backgroundColorStatus}
        AccessoryRightIconComponent={X}
        onClose={handleClose}
      />
    </>
  );
};

export const WorkoutConfigButton = memo(_WorkoutConfigButton);
