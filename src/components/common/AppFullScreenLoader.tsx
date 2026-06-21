import { ActivityIndicator } from 'react-native';
import { AppView } from './AppView/AppView.tsx';
import { AppText } from './AppText/AppText.tsx';
import { POP_UP_Z_INDEX } from '../../constants/common.ts';
import { useAppThemedColors } from '../../hooks/useAppThemedColors.ts';
import { useAppSafeAreaPadding } from '../../hooks/useAppSafeAreaPadding.ts';

export type AppFullScreenLoaderProps = {
  label?: string;
};

/**
 * Unlike `AppBackdrop`/`AppPopUp`, this is a plain non-Modal overlay -
 * native UI (e.g. the AdMob consent form) can't present on top of an
 * already-presented `Modal`, so this is used wherever such native UI
 * might appear right after a loading state.
 */
export const AppFullScreenLoader = ({ label }: AppFullScreenLoaderProps) => {
  const appColors = useAppThemedColors();

  const { safeAreaPaddingLeft, safeAreaPaddingRight } = useAppSafeAreaPadding();

  return (
    <AppView
      position={'absolute'}
      top={0}
      bottom={0}
      left={0}
      right={0}
      zIndex={POP_UP_Z_INDEX}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'m'}
      paddingLeft={safeAreaPaddingLeft}
      paddingRight={safeAreaPaddingRight}
      backgroundColorStatus={'semiTransparentOverlay'}>
      <ActivityIndicator
        color={appColors.textMuted}
        size={'large'}
      />
      {label && (
        <AppText
          grow={false}
          colorStatus={'textMuted'}>
          {label}
        </AppText>
      )}
    </AppView>
  );
};
