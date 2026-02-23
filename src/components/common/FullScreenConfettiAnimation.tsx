import {
  AppAnimationView,
  AppAnimationViewProps,
} from './AppAnimationView.tsx';
import { AppView } from './AppView/AppView.tsx';
import {
  FILL_CONTAINER_DIMENSION,
  POP_UP_Z_INDEX,
} from '../../constants/common.ts';
import { AppAnimation } from '../../assets/constants.ts';

export const FullScreenConfettiAnimation = ({
  isPresent,
}: Pick<AppAnimationViewProps, 'isPresent'>) => (
  <AppView
    pointerEvents={'none'}
    position={'absolute'}
    width={FILL_CONTAINER_DIMENSION}
    height={FILL_CONTAINER_DIMENSION}
    zIndex={POP_UP_Z_INDEX}>
    <AppAnimationView
      isPresent={isPresent}
      resourceName={AppAnimation.confetti}
    />
  </AppView>
);
