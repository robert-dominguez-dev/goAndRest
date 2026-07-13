import { useAtom, useSetAtom } from 'jotai';
import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { AppButton } from '../../../../controls/AppButton/AppButton.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../common/AppRow.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppToggle } from '../../../../common/AppToggle/AppToggle.tsx';
import { SettingsSection } from '../SettingsScreen/components/SettingsSection.tsx';
import {
  finishedWorkoutsCountAtom,
  isPremiumAtom,
  premiumCharacterActivationsAtom,
  starsRatedAtom,
  workoutHistoryAtom,
} from '../../../../../contexts/atoms.ts';
import { usePremiumActions } from '../../../../../contexts/premium/hooks/usePremiumActions.ts';
import { getDemoWorkoutHistoryLog } from '../HistoryScreen/helpers/getDemoWorkoutHistoryLog.ts';
import { MIN_NUMBER_OF_WORKOUTS_TO_REQUEST_REVIEW } from '../FinishedWorkoutScreen/FinishedWorkoutScreen.tsx';

type DevScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.DevScreen
>;

type DevToggleRowProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const DevToggleRow = ({ label, value, onValueChange }: DevToggleRowProps) => (
  <AppRow
    gap={'m'}
    alignItems={'center'}
    justifyContent={'space-between'}>
    <AppText category={'subHeader'}>{label}</AppText>
    <AppToggle
      value={value}
      onValueChange={onValueChange}
    />
  </AppRow>
);

export const DevScreen = ({ navigation }: DevScreenProps) => {
  const [isPremium, setIsPremium] = useAtom(isPremiumAtom);
  const setPremiumCharacterActivations = useSetAtom(
    premiumCharacterActivationsAtom,
  );
  const setWorkoutHistory = useSetAtom(workoutHistoryAtom);
  const setFinishedWorkoutsCount = useSetAtom(finishedWorkoutsCountAtom);
  const setStarsRated = useSetAtom(starsRatedAtom);

  const { purchasePremium, restorePremium } = usePremiumActions();

  const enableInAppReview = () => {
    void setFinishedWorkoutsCount(MIN_NUMBER_OF_WORKOUTS_TO_REQUEST_REVIEW);
    void setStarsRated(null);
  };

  return (
    <AppScreenLayout
      scrollable
      headerTitle={'DEV SCREEN'}
      headerAccessoryLeftIconName={'ArrowLeft'}
      onHeaderAccessoryLeftPress={navigation.goBack}>
      <AppView gap={'xl'}>
        <SettingsSection
          iconName={'Gem'}
          label={'Premium'}
          items={[
            <DevToggleRow
              key={'premium_toggle'}
              label={'Premium aktivní'}
              value={isPremium}
              onValueChange={value => void setIsPremium(value)}
            />,
            <AppButton
              key={'premium_purchase'}
              label={'Zkusit koupit (RevenueCat)'}
              iconName={'Gem'}
              backgroundColorStatus={'backgroundAlt'}
              textColorStatus={'text'}
              borderColorStatus={'border'}
              onPress={() => void purchasePremium()}
            />,
            <AppButton
              key={'premium_restore'}
              label={'Obnovit nákup'}
              iconName={'RotateCcw'}
              backgroundColorStatus={'backgroundAlt'}
              textColorStatus={'text'}
              borderColorStatus={'border'}
              onPress={() => void restorePremium()}
            />,
          ]}
        />
        <SettingsSection
          iconName={'Volume2'}
          label={'Prémiové postavy'}
          items={[
            <AppButton
              key={'reset_activations'}
              label={'Smazat aktivace postav'}
              iconName={'Trash2'}
              backgroundColorStatus={'negative'}
              onPress={() => void setPremiumCharacterActivations({})}
            />,
          ]}
        />
        <SettingsSection
          iconName={'History'}
          label={'Historie'}
          items={[
            <AppButton
              key={'seed_history'}
              label={'Naplnit demo historii'}
              iconName={'Download'}
              backgroundColorStatus={'backgroundAlt'}
              textColorStatus={'text'}
              borderColorStatus={'border'}
              onPress={() =>
                void setWorkoutHistory(getDemoWorkoutHistoryLog(Date.now()))
              }
            />,
            <AppButton
              key={'clear_history'}
              label={'Smazat historii'}
              iconName={'Trash2'}
              backgroundColorStatus={'negative'}
              onPress={() => void setWorkoutHistory([])}
            />,
          ]}
        />
        <SettingsSection
          iconName={'Star'}
          label={'In-app review'}
          items={[
            <AppButton
              key={'enable_in_app_review'}
              label={'Zobrazit in-app review'}
              iconName={'Star'}
              backgroundColorStatus={'backgroundAlt'}
              textColorStatus={'text'}
              borderColorStatus={'border'}
              onPress={enableInAppReview}
            />,
          ]}
        />
      </AppView>
    </AppScreenLayout>
  );
};
