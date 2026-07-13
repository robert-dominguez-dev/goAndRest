import { Fragment, memo } from 'react';
import { useAtomValue } from 'jotai';
import { AppView } from '../AppView/AppView.tsx';
import { AppText } from '../AppText/AppText.tsx';
import { AppDivider } from '../AppDivider.tsx';
import {
  AppSelectionBottomSheetItem,
  AppSelectionBottomSheetItemData,
} from '../AppSelectionBottomSheet/components/AppSelectionBottomSheetItem.tsx';
import { PremiumCharacterLockBadge } from './PremiumCharacterLockBadge.tsx';
import { PremiumCtaButton } from '../../controls/PremiumCtaButton/PremiumCtaButton.tsx';
import { useAppTranslation } from '../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../constants/common.ts';
import { checkIsLast } from '../../../helpers/checkIsLast.ts';
import {
  characterVariantSettingAtom,
  premiumCharacterActivationsAtom,
} from '../../../contexts/atoms.ts';
import {
  WorkoutCharacterVariant,
  workoutCharacterVariants,
} from '../../navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { getCharacterVariantSettingValueProps } from '../../navigation/AppNavigator/screens/SettingsScreen/helpers/getCharacterVariantSettingValueProps.ts';
import { getCharacterActivationDaysRemaining } from '../../../contexts/premiumCharacters/helpers/checkIsCharacterActive.ts';
import { getDaysRemainingLabel } from '../../../contexts/premiumCharacters/helpers/getDaysRemainingLabel.ts';
import { useIsPremiumCharacterUnlocked } from '../../../contexts/premiumCharacters/hooks/useIsPremiumCharacterUnlocked.ts';
import { useIsPremium } from '../../../contexts/premium/hooks/useIsPremium.ts';
import {
  PREMIUM_PRICE_PLACEHOLDER,
  usePremiumPrice,
} from '../../../contexts/premium/hooks/usePremiumPrice.ts';

type PremiumCharacterBottomSheetContentProps = {
  loadingValue: WorkoutCharacterVariant | null;
  onRowPress: (value: WorkoutCharacterVariant) => void;
  onUnlockAllPress?: () => void;
};

const PremiumCharacterBottomSheetContentComponent = ({
  loadingValue,
  onRowPress,
  onUnlockAllPress,
}: PremiumCharacterBottomSheetContentProps) => {
  const t = useAppTranslation();

  const { language } = useAppLanguage();

  const characterVariant = useAtomValue(characterVariantSettingAtom);
  const activations = useAtomValue(premiumCharacterActivationsAtom);

  const isPremium = useIsPremium();
  const isPremiumCharacterUnlocked = useIsPremiumCharacterUnlocked();
  const price = usePremiumPrice();

  const items = workoutCharacterVariants.map((value, index) => {
    const { labelTranslateKey, imageProps, previewAudioUrl, analytics } =
      getCharacterVariantSettingValueProps(value, language);

    const isActive = isPremiumCharacterUnlocked(value);

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
          accessoryLeftTextColorStatus={isPremium ? 'text' : 'premium'}
          audioParams={audioParams}
          analytics={analytics}
          selected={value === characterVariant && isActive}
          disabled={loadingValue !== null}
          accessoryRight={
            isPremium ? undefined : (
              <PremiumCharacterLockBadge
                isActive={isActive}
                isLoading={isLoading}
                label={getDaysRemainingLabel(daysRemaining, t)}
              />
            )
          }
          onSelect={() => onRowPress(value)}
        />
        {withDivider && <AppDivider />}
      </Fragment>
    );
  });

  return (
    <AppView gap={'l'}>
      <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
        {t(
          isPremium
            ? 'screens.settingsScreen.feedbackSection.items.characterVariant.premiumBottomSheet.descriptionPremium'
            : 'screens.settingsScreen.feedbackSection.items.characterVariant.premiumBottomSheet.description',
        )}
      </AppText>
      <AppView>{items}</AppView>
      {!isPremium && onUnlockAllPress && (
        <PremiumCtaButton
          label={t('common.paywall.charSheetUnlock', {
            priceString: price ?? PREMIUM_PRICE_PLACEHOLDER,
          })}
          onPress={onUnlockAllPress}
        />
      )}
    </AppView>
  );
};

export const PremiumCharacterBottomSheetContent = memo(
  PremiumCharacterBottomSheetContentComponent,
);
