import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppColorUnion } from '../../../../../../types/ui.ts';
import { EMPTY_SPACE } from '../../../../../../constants/common.ts';

const colorStatus: AppColorUnion = 'textMuted';

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
    colorStatus={colorStatus}
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
      colorStatus={colorStatus}
      category={'title'}>
      {'/'}
      {total}
    </AppText>
  </AppText>
);
