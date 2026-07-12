import { Modal } from 'react-native';

import {
  ALL_SUPPORTED_ORIENTATIONS,
  FILL_CONTAINER_DIMENSION,
  POP_UP_Z_INDEX,
} from '../../constants/common.ts';
import { ChildrenProp } from '../../types/common.ts';
import { AppView } from './AppView/AppView.tsx';

type AppBackdropProps = ChildrenProp & {
  onRequestClose?: () => void;
};

export const AppBackdrop = ({ children, onRequestClose }: AppBackdropProps) => (
  <Modal
    transparent
    statusBarTranslucent
    onRequestClose={onRequestClose}
    supportedOrientations={ALL_SUPPORTED_ORIENTATIONS}>
    <AppView
      grow
      backgroundColorStatus={'semiTransparentOverlay'}
      justifyContent={'center'}
      alignItems={'center'}
      padding={'m'}
      height={FILL_CONTAINER_DIMENSION}
      width={FILL_CONTAINER_DIMENSION}
      zIndex={POP_UP_Z_INDEX}>
      {children}
    </AppView>
  </Modal>
);
