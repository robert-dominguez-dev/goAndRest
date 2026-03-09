import { AppScreenLayout } from '../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../locales/hooks/useAppTranslation.ts';
import { AppText } from '../../../common/AppText/AppText.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../constants/common.ts';
import { useSetAtom } from 'jotai';
import { isDisclaimerInfoAgreedAtom } from '../../../../contexts/atoms.ts';
import { AppButton } from '../../../controls/AppButton/AppButton.tsx';
import { AppView } from '../../../common/AppView/AppView.tsx';
import { sectionTranslateKeys } from '../constants.ts';
import {
  useLanguageSettingBottomSheet
} from '../../AppNavigator/screens/SettingsScreen/hooks/useLanguageSettingBottomSheet.tsx';
import { AppRow } from '../../../common/AppRow.tsx';
import {
  AppSelectionBottomSheetItemText
} from '../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';
import {
  getAppLanguageSettingValueProps
} from '../../AppNavigator/screens/SettingsScreen/helpers/getAppLanguageSettingValueProps.ts';
import { useAppLanguage } from '../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { AppSize } from '../../../../types/ui.ts';

export const DisclaimerScreen = () => {
  const t = useAppTranslation();

  const setIsDisclaimerInfoAgreed = useSetAtom(isDisclaimerInfoAgreedAtom);

  const { language } = useAppLanguage();

  const { bottomSheet, openLanguageSettingsBottomSheet } =
    useLanguageSettingBottomSheet();

  const agree = () => setIsDisclaimerInfoAgreed(true);

  const sections = sectionTranslateKeys.map(({ titleKey, descriptionKey }) => (
    <AppView
      key={titleKey}
      gap={'xs'}>
      <AppText category={'title'}>{t(titleKey)}</AppText>
      <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
        {t(descriptionKey)}
      </AppText>
    </AppView>
  ));

  const buttonLabel = t('screens.disclaimerScreen.buttonLabel').toUpperCase();

  const footerElement = (
    <AppButton
      label={buttonLabel}
      onPress={agree}
    />
  );

  const { flagEmoji } = getAppLanguageSettingValueProps(language);

  const headerElement = (
    <AppRow alignItems={'center'}>
      <AppView width={AppSize.l} />
      <AppText
        category={'header'}
        textAlign={'center'}>
        {t('screens.disclaimerScreen.title')}
      </AppText>
      <AppView
        width={AppSize.l}
        alignItems={'flex-end'}
        justifyContent={'center'}
        onTouchStart={openLanguageSettingsBottomSheet}>
        <AppSelectionBottomSheetItemText label={flagEmoji} />
      </AppView>
    </AppRow>
  );
  return (
    <>
      <AppScreenLayout
        scrollable
        headerElementOverride={headerElement}
        footer={footerElement}>
        <AppView gap={'l'}>
          <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
            {t('screens.disclaimerScreen.description', { value: buttonLabel })}
          </AppText>
          <AppView gap={'ml'}>
            <AppText
              textAlign={'center'}
              category={'header'}>
              {t('screens.disclaimerScreen.subTitle')}
            </AppText>
            <AppView gap={'m'}>{sections}</AppView>
          </AppView>
        </AppView>
      </AppScreenLayout>
      {bottomSheet}
    </>
  );
};
