import { X } from 'lucide-react-native';
import { Control, useFormState } from 'react-hook-form';
import { AppWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppBottomSheet } from '../../../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import { AppInput } from '../../../../../../../controls/AppInput/AppInput.tsx';
import { AppText } from '../../../../../../../common/AppText/AppText.tsx';
import { AppButton } from '../../../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { getWorkoutNameRules } from '../../../../../../../controls/helpers/getWorkoutNameRules.ts';
import { TranslateKey } from '../../../../../../../../locales/types.ts';
import { memo } from 'react';

type SaveWorkoutButtonProps = {
  control: Control<AppWorkout>;
  isVisible: boolean;
  onClose: () => void;
  onSave: () => void;
};

const SaveWorkoutBottomSheetComponent = ({
  control,
  isVisible,
  onClose,
  onSave,
}: SaveWorkoutButtonProps) => {
  const t = useAppTranslation();

  const rules = getWorkoutNameRules(t);

  const { isValid } = useFormState<AppWorkout>({
    control,
    name: 'name',
  });

  const buttonLabelTranslateKey: TranslateKey = isValid
    ? 'screens.landingScreen.saveWorkoutBottomSheet.positiveButtonLabel'
    : 'screens.landingScreen.saveWorkoutBottomSheet.invalidButtonLabel';

  const bottomSheetContent = (
    <AppView gap={'l'}>
      <AppText>
        {t('screens.landingScreen.saveWorkoutBottomSheet.description')}
      </AppText>
      <AppInput
        name={'name'}
        label={t('screens.landingScreen.saveWorkoutBottomSheet.inputLabel')}
        control={control}
        rules={rules}
        autoFocus
      />
      <AppButton
        label={t(buttonLabelTranslateKey)}
        onPress={onSave}
        backgroundColorStatus={'primary'}
        disabled={!isValid}
      />
    </AppView>
  );

  return (
    <AppBottomSheet
      closeable
      scrollable={false}
      bottomSheetTitle={t('screens.landingScreen.saveWorkoutBottomSheet.title')}
      isVisible={isVisible}
      bottomSheetContent={bottomSheetContent}
      backgroundColorStatus={'backgroundAlt'}
      AccessoryRightIconComponent={X}
      onClose={onClose}
    />
  );
};

export const SaveWorkoutBottomSheet = memo(SaveWorkoutBottomSheetComponent);
