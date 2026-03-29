import { workoutSettingsButtonConfigMap } from '../../../constants.ts';
import { memo } from 'react';
import { AppButton } from '../../../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { useWatch } from 'react-hook-form';
import { WorkoutConfigButtonProps } from '../../../types.ts';
import { WorkoutConfigButtonValue } from './WorkoutConfigButtonValue.tsx';

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

  const { labelKey, backgroundColorStatus, iconName, valueFormatter } =
    workoutSettingsButtonConfigMap[name];

  const formattedValue = valueFormatter(value);

  const valueElement = (
    <WorkoutConfigButtonValue
      value={formattedValue}
      textAlign={'right'}
    />
  );

  return (
    <AppButton
      label={t(labelKey)}
      value={valueElement}
      backgroundColorStatus={backgroundColorStatus}
      iconName={iconName}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

export const WorkoutConfigButton = memo(WorkoutConfigButtonComponent);
