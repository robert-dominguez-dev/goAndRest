import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../constants.ts';
import { memo } from 'react';
import { AppButton } from '../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import {
  Control,
  Controller,
  UseFormResetField,
  useWatch,
} from 'react-hook-form';
import { AppBottomSheet } from '../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { useIsVisible } from '../../../../../common/AppBottomSheet/hooks/useIsVisible.ts';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppCircularSlider } from '../../../../../controls/AppCircularSlider/AppCircularSlider.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getOnPressWithHapticFeedback } from '../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { AppRoundedButton } from '../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { Check, RotateCcw } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { AppSize } from '../../../../../../types/ui.ts';

type WorkoutConfigButtonProps = {
  name: AppWorkoutConfigKey;
  control: Control<AppWorkout>;
  resetField: UseFormResetField<AppWorkout>;
};

const _WorkoutConfigButton = ({
  name,
  control,
  resetField,
}: WorkoutConfigButtonProps) => {
  const t = useAppTranslation();

  const { text } = useAppThemedColors();

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
                radius={150}
                strokeWidth={AppSize.l}
                minValue={min}
                maxValue={max}
                step={step}
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
                    size={40}
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

  const handleReset = () => {
    handleClose();
    resetField(name);
  };

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
        AccessoryRightIconComponent={RotateCcw}
        onClose={handleReset}
      />
    </>
  );
};

export const WorkoutConfigButton = memo(_WorkoutConfigButton);
