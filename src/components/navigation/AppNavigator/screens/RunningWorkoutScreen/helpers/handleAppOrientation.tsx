import { OrientationType } from 'react-native-orientation-locker';

type HandleAppOrientationParams = {
  orientation: OrientationType;
  onIsPortrait: () => void;
  onIsLandscape: () => void;
};

export const handleAppOrientation = ({
  orientation,
  onIsPortrait,
  onIsLandscape,
}: HandleAppOrientationParams) => {
  switch (orientation) {
    case OrientationType.PORTRAIT:
    case OrientationType['PORTRAIT-UPSIDEDOWN']: {
      return onIsPortrait();
    }
    case OrientationType['LANDSCAPE-LEFT']:
    case OrientationType['LANDSCAPE-RIGHT']: {
      return onIsLandscape();
    }
    case OrientationType['FACE-UP']:
    case OrientationType['FACE-DOWN']:
    case OrientationType['UNKNOWN']: {
      return undefined;
    }
    default: {
      return orientation satisfies never;
    }
  }
};
