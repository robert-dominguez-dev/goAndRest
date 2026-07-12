import { ReactNode } from 'react';
import { AppView } from './AppView/AppView.tsx';
import { POP_UP_Z_INDEX } from '../../constants/common.ts';
import { useAppSafeAreaPadding } from '../../hooks/useAppSafeAreaPadding.ts';
import { AppColorUnion } from '../../types/ui.ts';

type AppFullScreenOverlayProps = {
  children: ReactNode;
  backgroundColorStatus?: AppColorUnion;
};

/**
 * A plain (non-Modal) full-bleed overlay patterned after
 * `AppFullScreenLoader`: it reaches every screen edge (the background fills
 * to the edges) while its content is inset by the safe area. Native UI (a
 * store payment sheet, a consent form) can present on top of it because it
 * is not a `Modal`.
 */
export const AppFullScreenOverlay = ({
  children,
  backgroundColorStatus = 'semiTransparentOverlay',
}: AppFullScreenOverlayProps) => {
  const {
    safeAreaPaddingTop,
    safeAreaPaddingBottom,
    safeAreaPaddingLeft,
    safeAreaPaddingRight,
  } = useAppSafeAreaPadding();

  return (
    <AppView
      position={'absolute'}
      top={0}
      bottom={0}
      left={0}
      right={0}
      zIndex={POP_UP_Z_INDEX}
      paddingTop={safeAreaPaddingTop}
      paddingBottom={safeAreaPaddingBottom}
      paddingLeft={safeAreaPaddingLeft}
      paddingRight={safeAreaPaddingRight}
      backgroundColorStatus={backgroundColorStatus}>
      {children}
    </AppView>
  );
};
