import { memo } from 'react';
import { View } from 'react-native';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../constants/common.ts';
import {
  AREA_BACKGROUND_ALPHA_SUFFIX,
  historyChartStyles,
} from '../helpers/historyChartLayout.ts';

// The chart's background box, shown at the chart's footprint with the
// empty-state message centered inside - i.e. the box, just without a chart.
const HistoryChartEmptyComponent = () => {
  const t = useAppTranslation();
  const appColors = useAppThemedColors();

  return (
    <View
      style={[
        historyChartStyles.areaBackground,
        { backgroundColor: `${appColors.text}${AREA_BACKGROUND_ALPHA_SUFFIX}` },
      ]}>
      <View style={[historyChartStyles.container, historyChartStyles.emptyContent]}>
        <AppText
          grow={false}
          colorStatus={'textMuted'}
          textAlign={'center'}
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {t('common.chartEmpty')}
        </AppText>
      </View>
    </View>
  );
};

export const HistoryChartEmpty = memo(HistoryChartEmptyComponent);
