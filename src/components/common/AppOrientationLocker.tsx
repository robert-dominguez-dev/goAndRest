import { useIsTablet } from '../../hooks/useIsTablet.ts';
import {
  OrientationLocker,
  OrientationLockerProps,
} from 'react-native-orientation-locker';

type AppOrientationLockerProps = Pick<OrientationLockerProps, 'orientation'>;

export const AppOrientationLocker = ({
  orientation,
}: AppOrientationLockerProps) => {
  const isTablet = useIsTablet();

  /**
   * Orientation is always unlocked for tablets...
   */
  const orientationEvaluated: OrientationLockerProps['orientation'] = isTablet
    ? 'UNLOCK'
    : orientation;

  return <OrientationLocker orientation={orientationEvaluated} />;
};
