import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppColorUnion } from '../../../../../../types/ui.ts';
import { EMPTY_SPACE } from '../../../../../../constants/common.ts';

const COLOR_STATUS: AppColorUnion = 'textMuted';

type RunningWorkoutCounterProps = {
  label: string;
  current: number;
  total: number;
};

export const RunningWorkoutCounterText = ({
  label,
  current,
  total,
}: RunningWorkoutCounterProps) => (
  <AppText
    grow={false}
    colorStatus={COLOR_STATUS}
    category={'subHeader'}>
    {label.toUpperCase()}
    {EMPTY_SPACE}
    {EMPTY_SPACE}
    <AppText
      grow={false}
      colorStatus={'text'}
      category={'header'}>
      {current}
    </AppText>
    <AppText
      grow={false}
      colorStatus={COLOR_STATUS}
      category={'title'}>
      {'/'}
      {total}
    </AppText>
  </AppText>
);
