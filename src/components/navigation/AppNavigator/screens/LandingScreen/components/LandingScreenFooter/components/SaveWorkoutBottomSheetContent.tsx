import { useFormContext, useFormState } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import { AppInput } from '../../../../../../../controls/AppInput/AppInput.tsx';
import { AppText } from '../../../../../../../common/AppText/AppText.tsx';
import { AppButton } from '../../../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { getWorkoutNameRules } from '../../../../../../../controls/helpers/getWorkoutNameRules.ts';
import { TranslateKey } from '../../../../../../../../locales/types.ts';
import { memo, useCallback, useEffect, useState } from 'react';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../../../constants/common.ts';
import { AppBottomSheetRenderContentProps } from '../../../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { useAppWorkouts } from '../../../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { useRootStackNavigation } from '../../../../../../hooks/useRootStackNavigation.ts';
import { v4 as uuidv4 } from 'uuid';
import { AppNavigatorScreen } from '../../../../../types.ts';
import { findStoredWorkoutByName } from '../../../../../../../../contexts/AppWorkoutsProvider/helpers/findStoredWorkoutByName.ts';
import { getSameConfigStoredWorkouts } from '../../../../../../../../contexts/AppWorkoutsProvider/helpers/getSameConfigStoredWorkouts.ts';
import { getSameConfigHintNames } from '../helpers/getSameConfigHintNames.ts';
import { useSetAtom } from 'jotai';
import { heldWorkoutIdentityAtom } from '../../../../../../../../contexts/atoms.ts';

type SaveWorkoutBottomSheetContentProps = AppBottomSheetRenderContentProps & {
  onSave?: (values: AppWorkoutFieldValues) => void;
};

type DuplicateWorkout = {
  id: string;
  name: string;
};

const SaveWorkoutBottomSheetContentComponent = ({
  onClose,
  onSave,
}: SaveWorkoutBottomSheetContentProps) => {
  const t = useAppTranslation();

  const { storedWorkouts, storeWorkout } = useAppWorkouts();

  const setHeldWorkoutIdentity = useSetAtom(heldWorkoutIdentityAtom);

  const navigation = useRootStackNavigation();

  const handleSaveWorkout = ({
    workoutName,
    savedWorkoutId,
    ...workoutConfig
  }: AppWorkoutFieldValues) => {
    const id = savedWorkoutId ?? uuidv4();
    const existing = storedWorkouts.find(workout => workout.id === id);
    const meta = existing
      ? { ...existing.meta, name: workoutName, updatedAt: new Date() }
      : { name: workoutName, createdAt: new Date() };

    storeWorkout({ id, meta, config: workoutConfig });
    setHeldWorkoutIdentity({ savedWorkoutId: id, name: workoutName });

    navigation.navigate(AppNavigatorScreen.SavedWorkoutsScreen);
  };

  const rules = getWorkoutNameRules(t);

  const { control, handleSubmit, trigger, getValues, setValue } =
    useFormContext<AppWorkoutFieldValues>();

  const { isValid, errors } = useFormState<AppWorkoutFieldValues>({
    control,
    name: 'workoutName',
  });

  const errorMessage = errors.workoutName?.message;

  const triggerValidation = useCallback(
    () => void trigger('workoutName'),
    [trigger],
  );

  useEffect(() => {
    const hasStaleErrorMessage: boolean = isValid && !!errorMessage;

    if (hasStaleErrorMessage) {
      triggerValidation();
    }
  }, [isValid, errorMessage, triggerValidation]);

  const [duplicateWorkout, setDuplicateWorkout] = useState<
    DuplicateWorkout | undefined
  >(undefined);

  const submit = (overwriteId?: string) =>
    handleSubmit(values => {
      (onSave ?? handleSaveWorkout)({ ...values, savedWorkoutId: overwriteId });
      onClose();
    })();

  const handleSave = () => {
    const existing = findStoredWorkoutByName(
      storedWorkouts,
      getValues('workoutName'),
    );

    if (existing) {
      setDuplicateWorkout({ id: existing.id, name: existing.meta.name });
      return;
    }

    submit(undefined);
  };

  const handleOverwrite = () => submit(duplicateWorkout?.id);

  const handleRename = () => {
    if (duplicateWorkout) {
      setValue('workoutName', duplicateWorkout.name);
    }

    setDuplicateWorkout(undefined);
  };

  if (duplicateWorkout) {
    return (
      <AppView gap={'l'}>
        <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {t(
            'screens.landingScreen.saveWorkoutBottomSheet.duplicateNameDescription',
            { name: duplicateWorkout.name },
          )}
        </AppText>
        <AppButton
          label={t(
            'screens.landingScreen.saveWorkoutBottomSheet.overwriteButtonLabel',
          )}
          onPress={handleOverwrite}
          backgroundColorStatus={'primary'}
        />
        <AppButton
          label={t(
            'screens.landingScreen.saveWorkoutBottomSheet.renameButtonLabel',
          )}
          onPress={handleRename}
          backgroundColorStatus={'backgroundAlt'}
        />
      </AppView>
    );
  }

  const buttonLabelTranslateKey: TranslateKey = isValid
    ? 'screens.landingScreen.saveWorkoutBottomSheet.positiveButtonLabel'
    : 'screens.landingScreen.saveWorkoutBottomSheet.invalidButtonLabel';

  const sameConfigWorkouts = getSameConfigStoredWorkouts(
    storedWorkouts,
    getValues(),
  );
  const currentName = getValues('workoutName')?.trim() ?? '';
  const sameConfigOtherNameWorkouts = sameConfigWorkouts.filter(
    workout => workout.meta.name.trim() !== currentName,
  );
  const { names: sameConfigNames, hasMore: hasMoreSameConfigNames } =
    getSameConfigHintNames(sameConfigOtherNameWorkouts);
  const sameConfigNamesText = hasMoreSameConfigNames
    ? `${sameConfigNames.join(', ')} ${t(
        'screens.landingScreen.saveWorkoutBottomSheet.sameConfigHintAndMore',
      )}`
    : sameConfigNames.join(', ');

  return (
    <AppView gap={'l'}>
      <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
        {t('screens.landingScreen.saveWorkoutBottomSheet.description')}
      </AppText>
      {sameConfigOtherNameWorkouts.length > 0 && (
        <AppText
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}
          colorStatus={'textMuted'}>
          {t('screens.landingScreen.saveWorkoutBottomSheet.sameConfigHint', {
            names: sameConfigNamesText,
          })}
        </AppText>
      )}
      <AppInput
        name={'workoutName'}
        label={t('screens.landingScreen.saveWorkoutBottomSheet.inputLabel')}
        control={control}
        rules={rules}
        autoFocus
        shouldUnregister
      />
      <AppButton
        label={t(buttonLabelTranslateKey)}
        onPress={handleSave}
        onDisabledPress={triggerValidation}
        backgroundColorStatus={'primary'}
        disabled={!isValid}
      />
    </AppView>
  );
};

export const SaveWorkoutBottomSheetContent = memo(
  SaveWorkoutBottomSheetContentComponent,
);
