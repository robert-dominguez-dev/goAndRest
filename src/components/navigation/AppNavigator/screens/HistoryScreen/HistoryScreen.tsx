import { useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useAtomValue, useSetAtom } from 'jotai';
import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import {
  isHistoryPaywallVisibleAtom,
  workoutHistoryAtom,
} from '../../../../../contexts/atoms.ts';
import { useIsPremium } from '../../../../../contexts/premium/hooks/useIsPremium.ts';
import { getDemoWorkoutHistoryLog } from './helpers/getDemoWorkoutHistoryLog.ts';
import { HistoryContent } from './components/HistoryContent.tsx';

type HistoryScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.HistoryScreen
>;

export const HistoryScreen = ({ navigation }: HistoryScreenProps) => {
  const t = useAppTranslation();

  const log = useAtomValue(workoutHistoryAtom);
  const isPremium = useIsPremium();

  const setHistoryPaywallVisible = useSetAtom(isHistoryPaywallVisibleAtom);

  const demoLog = useMemo(() => getDemoWorkoutHistoryLog(Date.now()), []);

  const data = isPremium ? log : demoLog;

  // The paywall overlay is rendered at the app root (so it covers the screen
  // edge to edge, above the header). Toggle it on only while this screen is
  // focused for a free user.
  useFocusEffect(
    useCallback(() => {
      setHistoryPaywallVisible(!isPremium);
      return () => setHistoryPaywallVisible(false);
    }, [isPremium, setHistoryPaywallVisible]),
  );

  return (
    <AppScreenLayout
      scrollable={isPremium}
      headerTitle={t('screens.historyScreen.title')}
      headerAccessoryLeftIconName={'ArrowLeft'}
      onHeaderAccessoryLeftPress={navigation.goBack}>
      <HistoryContent
        data={data}
        onEntryPress={entry =>
          navigation.navigate(AppNavigatorScreen.HistoryDetailScreen, {
            entry,
          })
        }
      />
    </AppScreenLayout>
  );
};
