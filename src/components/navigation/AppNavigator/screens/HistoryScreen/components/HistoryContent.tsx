import { memo, useMemo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { computeStreak } from '../../../../../../helpers/computeStreak.ts';
import { weekVolume } from '../../../../../../helpers/weekVolume.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import { HistoryStatsRow } from './HistoryStatsRow.tsx';
import { HistoryChartCard } from './HistoryChartCard.tsx';
import { HistoryRecentList } from './HistoryRecentList.tsx';

const CHART_ENTRIES_COUNT = 14;
const RECENT_ENTRIES_COUNT = 20;

type HistoryContentProps = {
  data: WorkoutHistoryEntry[];
  onEntryPress: (entry: WorkoutHistoryEntry) => void;
};

const HistoryContentComponent = ({
  data,
  onEntryPress,
}: HistoryContentProps) => {
  const streak = useMemo(() => computeStreak(data), [data]);
  const weekVolumeStats = useMemo(() => weekVolume(data), [data]);

  const chartData = useMemo(
    () => data.slice(0, CHART_ENTRIES_COUNT).reverse(),
    [data],
  );

  const recentEntries = useMemo(
    () => data.slice(0, RECENT_ENTRIES_COUNT),
    [data],
  );

  return (
    <AppView gap={'m'}>
      <HistoryStatsRow
        streak={streak}
        weekVolumeStats={weekVolumeStats}
      />
      <HistoryChartCard data={chartData} />
      <HistoryRecentList
        entries={recentEntries}
        onEntryPress={onEntryPress}
      />
    </AppView>
  );
};

export const HistoryContent = memo(HistoryContentComponent);
