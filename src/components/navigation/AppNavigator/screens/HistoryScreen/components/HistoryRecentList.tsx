import { Fragment, memo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppDivider } from '../../../../../common/AppDivider.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../constants/common.ts';
import { checkIsLast } from '../../../../../../helpers/checkIsLast.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
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

  return (
    <AppView gap={'s'}>
      <AppText
        category={'subHeader'}
        colorStatus={'textMuted'}>
        {t('screens.historyScreen.recentTitle')}
      </AppText>
      {entries.length ? (
        entries.map((entry, index) => (
          <Fragment key={`${entry.date}-${index}`}>
            <HistoryRecentListItem
              entry={entry}
              onPress={onEntryPress}
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
  );
};

export const HistoryRecentList = memo(HistoryRecentListComponent);
