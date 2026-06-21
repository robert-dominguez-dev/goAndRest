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
import {
  checkIsCharacterActive,
  getCharacterActivationDaysRemaining,
} from '../../../contexts/premiumCharacters/helpers/checkIsCharacterActive.ts';
import { getDaysRemainingLabel } from '../../../contexts/premiumCharacters/helpers/getDaysRemainingLabel.ts';

type PremiumCharacterBottomSheetContentProps = {
  loadingValue: WorkoutCharacterVariant | null;
  onRowPress: (value: WorkoutCharacterVariant) => void;
};

const PremiumCharacterBottomSheetContentComponent = ({
  loadingValue,
  onRowPress,
}: PremiumCharacterBottomSheetContentProps) => {
  const t = useAppTranslation();

  const { language } = useAppLanguage();

  const characterVariant = useAtomValue(characterVariantSettingAtom);
  const activations = useAtomValue(premiumCharacterActivationsAtom);

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
