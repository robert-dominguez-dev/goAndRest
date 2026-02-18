import { memo } from 'react';
import { AppText, AppTextProps, } from '../../../../../../../common/AppText/AppText.tsx';
import { AppSize } from '../../../../../../../../types/ui.ts';

type WorkoutConfigButtonValueProps = Pick<AppTextProps, 'textAlign'> & {
  value: string;
};

const WorkoutConfigButtonValueComponent = ({
  value,
  textAlign = 'center',
}: WorkoutConfigButtonValueProps) => (
  <AppText
    textAlign={textAlign}
    category={'title'}
    fontSizeOverride={AppSize.l}
    numberOfLines={1}>
    {value}
  </AppText>
);
export const WorkoutConfigButtonValue = memo(WorkoutConfigButtonValueComponent);
