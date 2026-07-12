import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { workoutHistoryAtom } from '../../../../../contexts/atoms.ts';
import { useIsPremium } from '../../../../../contexts/premium/hooks/useIsPremium.ts';
import { usePaywallBottomSheet } from '../../../../common/PaywallBottomSheet/hooks/usePaywallBottomSheet.tsx';
import { INACTIVE_OPACITY } from '../../../../../constants/ui.ts';
import { useHistoryDetailBottomSheet } from './hooks/useHistoryDetailBottomSheet.tsx';
import { getDemoWorkoutHistoryLog } from './helpers/getDemoWorkoutHistoryLog.ts';
import { HistoryContent } from './components/HistoryContent.tsx';
import { HistoryPremiumOverlay } from './components/HistoryPremiumOverlay.tsx';

type HistoryScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.HistoryScreen
>;

export const HistoryScreen = ({ navigation }: HistoryScreenProps) => {
  const t = useAppTranslation();

  const log = useAtomValue(workoutHistoryAtom);
  const isPremium = useIsPremium();

  const demoLog = useMemo(() => getDemoWorkoutHistoryLog(Date.now()), []);

  const data = isPremium ? log : demoLog;

  const { paywallBottomSheet, openPaywall } = usePaywallBottomSheet();

  const { bottomSheet: detailBottomSheet, openHistoryDetailBottomSheet } =
    useHistoryDetailBottomSheet();

  const content = (
    <HistoryContent
      data={data}
      onEntryPress={openHistoryDetailBottomSheet}
    />
  );

  return (
    <>
      <AppScreenLayout
        scrollable={isPremium}
        headerTitle={t('screens.historyScreen.title')}
        headerAccessoryLeftIconName={'ArrowLeft'}
        onHeaderAccessoryLeftPress={navigation.goBack}>
        {isPremium ? (
          content
        ) : (
          <AppView grow>
            <AppView
              grow
              opacity={INACTIVE_OPACITY}
              pointerEvents={'none'}>
              {content}
            </AppView>
            <HistoryPremiumOverlay onUnlockPress={openPaywall} />
          </AppView>
        )}
      </AppScreenLayout>
      {paywallBottomSheet}
      {detailBottomSheet}
    </>
  );
};
