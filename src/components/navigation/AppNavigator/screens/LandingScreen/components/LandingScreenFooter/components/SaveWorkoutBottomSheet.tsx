import { X } from 'lucide-react-native';
import { Control } from 'react-hook-form';
import { AppWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppBottomSheet } from '../../../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { WorkoutConfigCircularSliderProps } from '../../WorkoutConfigButtons/components/WorkoutConfigCircularSlider.tsx';
import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import { AppInput } from '../../../../../../../controls/AppInput/AppInput.tsx';
import { AppText } from '../../../../../../../common/AppText/AppText.tsx';
import { AppButton } from '../../../../../../../controls/AppButton/AppButton.tsx';

type SaveWorkoutButtonProps = Pick<
  WorkoutConfigCircularSliderProps,
  'onConfirm'
> & {
  control: Control<AppWorkout>;
  isVisible: boolean;
  onClose: () => void;
};

export const SaveWorkoutBottomSheet = ({
  control,
  isVisible,
  onClose,
  onConfirm,
}: SaveWorkoutButtonProps) => {
  const bottomSheetContent = (
    <AppView gap={'l'}>
      <AppText>Pojmenuj sou konfiguraci tréninku a vyber ikonu.</AppText>
      <AppInput
        name={'name'}
        control={control}
        label={'Název konfigurace'}
        autoFocus
      />
      <AppButton
        label={'Uložit'}
        onPress={onConfirm}
        backgroundColorStatus={'primary'}
      />
    </AppView>
  );

  return (
    <AppBottomSheet
      closeable
      scrollable={false}
      bottomSheetTitle={'Uložení konfigurace'}
      isVisible={isVisible}
      bottomSheetContent={bottomSheetContent}
      backgroundColorStatus={'backgroundAlt'}
      AccessoryRightIconComponent={X}
      onClose={onClose}
    />
  );
};
