import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { StatBox, StatBoxProps } from './StatBox.tsx';

type StatBoxWithTitleProps = StatBoxProps & {
  title: string;
};

export const StatBoxWithTitle = ({
  children,
  title,
  width,
}: StatBoxWithTitleProps) => (
  <StatBox width={width}>
    <AppText
      grow={false}
      category={'title'}
      colorStatus={'textMuted'}
      textAlign={'center'}>
      {title.toUpperCase()}
    </AppText>
    {children}
  </StatBox>
);
