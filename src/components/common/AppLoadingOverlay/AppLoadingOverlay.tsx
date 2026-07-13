import { memo } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { AppText } from '../AppText/AppText.tsx';
import { useAppThemedColors } from '../../../hooks/useAppThemedColors.ts';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../constants/common.ts';

export type AppLoadingOverlayProps = {
  visible: boolean;
  message: string;
};

// The scrim is always dark in both themes, so the content stays a fixed light
// tone for legibility (theme `background` would vanish on the dark scrim).
const OVERLAY_CONTENT_COLOR = '#FFFFFF';

// A plain in-tree overlay rather than a RN Modal: a Modal presented while a
// navigation push is still animating, or torn down right before/after a native
// share sheet, leaves an invisible modal window on iOS that swallows every
// touch (the app looks frozen). An absolute overlay has no such collision and
// fully releases touches the moment `visible` turns false.
const AppLoadingOverlayComponent = ({
  visible,
  message,
}: AppLoadingOverlayProps) => {
  const colors = useAppThemedColors();

  if (!visible) {
    return null;
  }

  const content = (
    <View
      style={[
        StyleSheet.absoluteFill,
        styles.overlay,
        { backgroundColor: colors.semiTransparentOverlay },
      ]}>
      <ActivityIndicator
        size={'large'}
        color={OVERLAY_CONTENT_COLOR}
      />
      <AppText
        grow={false}
        colorOverride={OVERLAY_CONTENT_COLOR}
        category={'contentBold'}
        textAlign={'center'}
        numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
        {message}
      </AppText>
    </View>
  );

  // On Android the in-tree overlay stops below the (opaque) status bar. A Modal
  // with `statusBarTranslucent` lets the scrim cover the status bar too. The
  // iOS Modal-collision issue (see above) is Android-safe, so iOS keeps the
  // plain in-tree overlay.
  if (Platform.OS === 'android') {
    return (
      <Modal
        transparent
        visible
        statusBarTranslucent
        animationType={'fade'}
        onRequestClose={() => {}}>
        {content}
      </Modal>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    zIndex: 1000,
    elevation: 1000,
  },
});

export const AppLoadingOverlay = memo(AppLoadingOverlayComponent);
