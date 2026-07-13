import {
  AppView,
  AppViewProps,
} from '../../../../../common/AppView/AppView.tsx';
import { ChildrenProp } from '../../../../../../types/common.ts';

const STAT_BOX_HEIGHT = 100;

export type StatBoxProps = ChildrenProp & Pick<AppViewProps, 'width'>;

export const StatBox = ({ children, width }: StatBoxProps) => (
  <AppView
    height={STAT_BOX_HEIGHT}
    width={width}
    grow={!width}
    alignItems={'center'}
    justifyContent={'space-between'}
    backgroundColorStatus={'backgroundAlt'}
    borderRadius={'m'}
    padding={'m'}>
    {children}
  </AppView>
);
