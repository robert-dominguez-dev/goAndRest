import { Pressable } from 'react-native';
import { AppBackdrop } from '../../../../../common/AppBackdrop.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { getPressableOpacity } from '../../../../../controls/helpers/getPressableOpacity.ts';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useMaxTabletActiveElementWidth } from '../../../../../../hooks/useMaxTabletActiveElementWidth.ts';
import {
  FILL_CONTAINER_DIMENSION,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../../../../../constants/common.ts';
import { RPE_LEVELS } from '../../../../../../constants/rpe.ts';

type RpeRatingPopUpProps = {
  onSelect: (rpe: number) => void;
};

/**
 * The popup must not be dismissible without picking a value,
 * so the Android hardware back button is neutralized here...
 */
const doNotAllowClosing = () => {};

export const RpeRatingPopUp = ({ onSelect }: RpeRatingPopUpProps) => {
  const t = useAppTranslation();

  const maxWidth = useMaxTabletActiveElementWidth();

  return (
    <AppBackdrop onRequestClose={doNotAllowClosing}>
      <AppView
        width={FILL_CONTAINER_DIMENSION}
        maxWidth={maxWidth}
        gap={'m'}
        padding={'m'}
        borderRadius={'s'}
        backgroundColorStatus={'backgroundAlt'}>
        <AppText
          category={'header'}
          textAlign={'center'}
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {t('screens.finishedWorkoutScreen.rpePopupTitle')}
        </AppText>
        <AppText
          colorStatus={'textMuted'}
          textAlign={'center'}
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {t('screens.finishedWorkoutScreen.rpePopupDescription')}
        </AppText>
        <AppRow gap={'s'}>
          {RPE_LEVELS.map((level, index) => (
            <Pressable
              key={level.labelKey}
              onPress={getOnPressWithHapticFeedbackConditionally(() =>
                onSelect(index),
              )}
              style={{ flex: 1, flexBasis: 0 }}>
              {({ pressed }) => (
                <AppView
                  grow
                  flexBasis={0}
                  opacity={getPressableOpacity({ pressed, disabled: false })}
                  alignItems={'center'}
                  gap={'xs'}
                  paddingVertical={'s'}
                  paddingHorizontal={'xxs'}
                  borderRadius={'s'}
                  backgroundColorStatus={'background'}>
                  <AppText
                    category={'title'}
                    textAlign={'center'}>
                    {level.face}
                  </AppText>
                  <AppText
                    category={'contentBold'}
                    colorStatus={'textMuted'}
                    textAlign={'center'}
                    numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
                    {t(level.labelKey)}
                  </AppText>
                </AppView>
              )}
            </Pressable>
          ))}
        </AppRow>
      </AppView>
    </AppBackdrop>
  );
};
