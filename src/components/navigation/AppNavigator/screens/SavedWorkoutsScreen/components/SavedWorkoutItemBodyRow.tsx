import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppRow } from '../../../../../common/AppRow.tsx';
import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../../LandingScreen/constants.ts';
import { AppColorUnion } from '../../../../../../types/ui.ts';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';

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
      gap={'xs'}
      paddingVertical={'s'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <AppText
        grow={false}
        category={'contentBold'}
        colorStatus={colorStatus}>
        {t(labelKey)}
      </AppText>
      <AppView>
        <AppText
          grow={false}
          category={'subHeader'}
          textAlign={'right'}>
          {formattedValue}
        </AppText>
      </AppView>
    </AppRow>
  );
};
