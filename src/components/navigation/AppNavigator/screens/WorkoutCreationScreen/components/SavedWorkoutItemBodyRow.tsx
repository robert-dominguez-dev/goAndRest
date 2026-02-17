import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppRow } from '../../../../../common/AppRow.tsx';
import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../../LandingScreen/constants.ts';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';

export type SavedWorkoutItemBodyRowProps = {
  name: AppWorkoutConfigKey;
  value: number;
};

export const SavedWorkoutItemBodyRow = ({
  name,
  value,
}: SavedWorkoutItemBodyRowProps) => {
  const t = useAppTranslation();

  const { labelKey, backgroundColorStatus, valueFormatter } =
    workoutSettingsButtonConfigMap[name];

  const formattedValue = valueFormatter(value);

  return (
    <AppRow
      grow
      alignItems={'center'}
      justifyContent={'space-between'}>
      <AppView grow>
        <AppRow
          shrink
          gap={'xs'}
          alignItems={'center'}>
          <AppText
            category={'title'}
            colorStatus={backgroundColorStatus}>
            {t(labelKey)}
          </AppText>
        </AppRow>
      </AppView>
      <AppText
        shrink
        category={'subHeader'}
        textAlign={'right'}>
        {formattedValue}
      </AppText>
    </AppRow>
  );
};
