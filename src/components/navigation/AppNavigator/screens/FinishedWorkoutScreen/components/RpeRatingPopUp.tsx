import { Pressable } from 'react-native';
import { AppBackdrop } from '../../../../../common/AppBackdrop.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppButton } from '../../../../../controls/AppButton/AppButton.tsx';
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
  // Dismiss without rating - the workout is still saved, just with no
  // difficulty, so the user is not forced to rate right after a workout.
  onClose: () => void;
  // Highlights the current pick when the popup is reopened to correct it.
  selectedRpe: number | null;
};

export const RpeRatingPopUp = ({
  onSelect,
  onClose,
  selectedRpe,
}: RpeRatingPopUpProps) => {
  const t = useAppTranslation();

  const maxWidth = useMaxTabletActiveElementWidth();

  return (
    <AppBackdrop onRequestClose={onClose}>
      <AppView
        width={FILL_CONTAINER_DIMENSION}
        maxWidth={maxWidth}
        gap={'m'}
        padding={'m'}
        margin={'m'}
        borderRadius={'s'}
        backgroundColorStatus={'backgroundAlt'}
        borderColorStatus={'border'}
        shadowColorStatus={'border'}
        borderWidthOverride={1}>
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
        <AppRow gap={'xs'}>
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
                  opacity={getPressableOpacity({ pressed, disabled: false })}
                  alignItems={'center'}
                  gap={'xs'}
                  paddingVertical={'s'}
                  paddingHorizontal={'xxs'}
                  borderRadius={'s'}
                  borderColorStatus={
                    index === selectedRpe ? 'premium' : undefined
                  }
                  backgroundColorStatus={'background'}>
                  <AppText
                    grow={false}
                    category={'header'}
                    textAlign={'center'}>
                    {level.face}
                  </AppText>
                  <AppText
                    category={'caption'}
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
        <AppButton
          label={t('common.close')}
          backgroundColorStatus={'transparent'}
          textColorStatus={'textMuted'}
          onPress={onClose}
        />
      </AppView>
    </AppBackdrop>
  );
};
