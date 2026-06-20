import { Fragment, memo, useState } from 'react';
import { useAtom } from 'jotai';
import { AppView } from '../AppView/AppView.tsx';
import { AppText } from '../AppText/AppText.tsx';
import { AppDivider } from '../AppDivider.tsx';
import { AppBottomSheetRenderContentProps } from '../AppBottomSheet/AppBottomSheet.tsx';
import {
  AppSelectionBottomSheetItem,
  AppSelectionBottomSheetItemData,
} from '../AppSelectionBottomSheet/components/AppSelectionBottomSheetItem.tsx';
import { PremiumCharacterLockBadge } from './PremiumCharacterLockBadge.tsx';
import { useAppTranslation } from '../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../constants/common.ts';
import { checkIsLast } from '../../../helpers/checkIsLast.ts';
import {
  characterVariantSettingAtom,
  premiumCharacterActivationsAtom,
  soundFeedbackSettingAtom,
} from '../../../contexts/atoms.ts';
import {
  WorkoutCharacterVariant,
  workoutCharacterVariants,
  WorkoutSoundFeedback,
} from '../../navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import {
  getCharacterVariantSettingValueProps
} from '../../navigation/AppNavigator/screens/SettingsScreen/helpers/getCharacterVariantSettingValueProps.ts';
import {
  checkIsCharacterActive,
  getCharacterActivationDaysRemaining,
} from '../../../contexts/premiumCharacters/helpers/checkIsCharacterActive.ts';
import { getDaysRemainingLabel } from '../../../contexts/premiumCharacters/helpers/getDaysRemainingLabel.ts';
import { useRewardedAd } from '../../../hooks/useRewardedAd/useRewardedAd.ts';

type PremiumCharacterBottomSheetContentProps =
  AppBottomSheetRenderContentProps & {
    showRewardedAd: ReturnType<typeof useRewardedAd>['showRewardedAd'];
  };

const PremiumCharacterBottomSheetContentComponent = ({
  onClose,
  showRewardedAd,
}: PremiumCharacterBottomSheetContentProps) => {
  const t = useAppTranslation();

  const { language } = useAppLanguage();

  const [soundFeedback, setSoundFeedback] = useAtom(soundFeedbackSettingAtom);

  const [characterVariant, setCharacterVariant] = useAtom(
    characterVariantSettingAtom,
  );

  const [activations, setActivations] = useAtom(
    premiumCharacterActivationsAtom,
  );

  const [loadingValue, setLoadingValue] =
    useState<WorkoutCharacterVariant | null>(null);

  const handleRowPress = async (value: WorkoutCharacterVariant) => {
    if (checkIsCharacterActive(activations, value)) {
      void setCharacterVariant(value);
      onClose();
      return undefined;
    }

    setLoadingValue(value);
    const earnedReward = await showRewardedAd();
    setLoadingValue(null);

    if (!earnedReward) {
      return undefined;
    }

    if (soundFeedback !== WorkoutSoundFeedback.character) {
      void setSoundFeedback(WorkoutSoundFeedback.character);
    }

    void setActivations(prev => ({ ...prev, [value]: Date.now() }));
    void setCharacterVariant(value);
    onClose();
  };

  const items = workoutCharacterVariants.map((value, index) => {
    const { labelTranslateKey, imageProps, previewAudioUrl, analytics } =
      getCharacterVariantSettingValueProps(value, language);

    const isActive = checkIsCharacterActive(activations, value);

    const daysRemaining = getCharacterActivationDaysRemaining(
      activations,
      value,
    );

    const audioParams: AppSelectionBottomSheetItemData<WorkoutCharacterVariant>['audioParams'] =
      previewAudioUrl
        ? {
            soundKey: `${value}_preview`,
            url: previewAudioUrl,
          }
        : undefined;

    const withDivider = !checkIsLast(workoutCharacterVariants, index);

    const isLoading = value === loadingValue;

    return (
      <Fragment key={value}>
        <AppSelectionBottomSheetItem
          value={value}
          label={t(labelTranslateKey)}
          accessoryLeftImageProps={imageProps}
          accessoryLeftTextColorStatus={'premium'}
          audioParams={audioParams}
          analytics={analytics}
          selected={value === characterVariant && isActive}
          disabled={loadingValue !== null}
          accessoryRight={
            <PremiumCharacterLockBadge
              isActive={isActive}
              isLoading={isLoading}
              label={getDaysRemainingLabel(daysRemaining, t)}
            />
          }
          onSelect={() => {
            void handleRowPress(value);
          }}
        />
        {withDivider && <AppDivider />}
      </Fragment>
    );
  });

  return (
    <AppView gap={'l'}>
      <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
        {t(
          'screens.settingsScreen.feedbackSection.items.characterVariant.premiumBottomSheet.description',
        )}
      </AppText>
      <AppView>{items}</AppView>
    </AppView>
  );
};

export const PremiumCharacterBottomSheetContent = memo(
  PremiumCharacterBottomSheetContentComponent,
);
