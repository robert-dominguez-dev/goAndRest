import { Fragment, memo, useMemo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppDivider } from '../../../../../common/AppDivider.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../constants/common.ts';
import { checkIsLast } from '../../../../../../helpers/checkIsLast.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { getHistoryEntryBadgeStatus } from '../../../../../../contexts/workoutHistory/helpers/getHistoryEntryBadgeStatus.ts';
import { getWorkoutConfigSignature } from '../../../../../../contexts/workoutHistory/helpers/getWorkoutConfigSignature.ts';
import { HistoryRecentListItem } from './HistoryRecentListItem.tsx';

type HistoryRecentListProps = {
  entries: WorkoutHistoryEntry[];
  onEntryPress: (entry: WorkoutHistoryEntry) => void;
};

const HistoryRecentListComponent = ({
  entries,
  onEntryPress,
}: HistoryRecentListProps) => {
  const t = useAppTranslation();
  const { storedWorkouts } = useAppWorkouts();

  const savedSignatureByName: Record<string, string> = useMemo(
    () =>
      Object.fromEntries(
        storedWorkouts.map(workout => [
          workout.meta.name,
          getWorkoutConfigSignature(workout.config),
        ]),
      ),
    [storedWorkouts],
  );

  return (
    <AppView gap={'xs'}>
      <AppText
        category={'subHeader'}
        colorStatus={'textMuted'}>
        {t('screens.historyScreen.recentTitle').toUpperCase()}
      </AppText>
      <AppView>
        {entries.length ? (
          entries.map((entry, index) => (
            <Fragment key={entry.id}>
              <HistoryRecentListItem
                entry={entry}
                onPress={onEntryPress}
                badgeStatus={getHistoryEntryBadgeStatus(
                  entry,
                  savedSignatureByName,
                )}
              />
              {!checkIsLast(entries, index) && <AppDivider />}
            </Fragment>
          ))
        ) : (
          <AppText
            colorStatus={'textMuted'}
            textAlign={'center'}
            numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
            {t('screens.historyScreen.listEmpty')}
          </AppText>
        )}
      </AppView>
    </AppView>
  );
};

export const HistoryRecentList = memo(HistoryRecentListComponent);
