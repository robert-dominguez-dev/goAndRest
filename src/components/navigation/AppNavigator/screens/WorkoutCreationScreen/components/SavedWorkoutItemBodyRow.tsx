import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppRow } from '../../../../../common/AppRow.tsx';
import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../../LandingScreen/constants.ts';
import { AppColorUnion } from '../../../../../../types/ui.ts';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';

export type SavedWorkoutItemBodyRowProps = {
  name: AppWorkoutConfigKey;
  value: number;
  backgroundColorStatusOverride?: AppColorUnion;
};

export const SavedWorkoutItemBodyRow = ({
  name,
  value,
  backgroundColorStatusOverride,
}: SavedWorkoutItemBodyRowProps) => {
  const t = useAppTranslation();

  const { labelKey, backgroundColorStatus, valueFormatter } =
    workoutSettingsButtonConfigMap[name];

  const formattedValue = valueFormatter(value);

  const colorStatus: AppColorUnion =
    backgroundColorStatusOverride || backgroundColorStatus;

  return (
    <AppRow
      grow
      paddingVertical={'s'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <AppView grow>
        <AppRow
          shrink
          gap={'xs'}
          alignItems={'center'}>
          <AppText
            category={'contentBold'}
            colorStatus={colorStatus}>
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
