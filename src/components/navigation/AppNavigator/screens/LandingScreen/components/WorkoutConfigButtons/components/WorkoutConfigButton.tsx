import { workoutSettingsButtonConfigMap } from '../../../constants.ts';
import { memo } from 'react';
import { AppButton } from '../../../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { useWatch } from 'react-hook-form';
import { WorkoutConfigButtonProps } from '../../../types.ts';

const WorkoutConfigButtonComponent = ({
  control,
  name,
  onPress,
  disabled,
}: WorkoutConfigButtonProps) => {
  const t = useAppTranslation();

  const value = useWatch({
    control,
    name,
  });

  const { labelKey, backgroundColorStatus, IconComponent, valueFormatter } =
    workoutSettingsButtonConfigMap[name];

  const formattedValue = valueFormatter(value);

  return (
    <AppButton
      label={t(labelKey)}
      value={formattedValue}
      backgroundColorStatus={backgroundColorStatus}
      IconComponent={IconComponent}
      onPress={onPress}
      disabled={disabled}
      category={'subHeader'}
    />
  );
};

export const WorkoutConfigButton = memo(WorkoutConfigButtonComponent);
