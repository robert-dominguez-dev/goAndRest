import { Modal } from 'react-native';

import { FILL_CONTAINER_DIMENSION, POP_UP_Z_INDEX, } from '../../constants/common.ts';
import { ChildrenProp } from '../../types/common.ts';
import { AppView } from './AppView/AppView.tsx';

export const AppBackdrop = ({ children }: ChildrenProp) => (
  <Modal
    transparent
    statusBarTranslucent>
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
