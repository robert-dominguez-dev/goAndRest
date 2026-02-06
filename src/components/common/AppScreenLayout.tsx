import { AppView, AppViewProps } from './AppView.tsx';
import { ScrollView } from 'react-native';
import { FILL_CONTAINER_DIMENSION } from '../../constants/common.ts';
import {
  AppScreenBackground,
  AppScreenBackgroundProps,
} from './AppScreenBackground.tsx';
import { AppIllustration } from '../../assets/constants.ts';
import { AppHeader, AppHeaderProps } from './AppHeader/AppHeader.tsx';
import { ReactNode } from 'react';

import { useAppSafeAreaPadding } from '../../hooks/useAppSafeAreaPadding.ts';
import { AppSizeUnion } from '../../types/ui.ts';

export type AppScreenLayoutProps = Pick<AppViewProps, 'children'> &
  Pick<AppViewProps, 'backgroundColorStatus'> & {
    headerTitle?: AppHeaderProps['title'];
    HeaderAccessoryRightIconComponent?: AppHeaderProps['AccessoryRightIconComponent'];
    headerAccessoryLeft?: AppHeaderProps['accessoryLeft'];
    onHeaderAccessoryRightPress?: AppHeaderProps['onAccessoryRightPress'];
    onHeaderAccessoryLeftPress?: AppHeaderProps['onAccessoryLeftPress'];
    footer?: ReactNode;
    scrollable?: boolean;
    backgroundIllustration?: AppScreenBackgroundProps['illustrationName'];
    disablePaddingBottom?: boolean;
  };

export const AppScreenLayout = ({
  children,
  headerTitle,
  headerAccessoryLeft,
  onHeaderAccessoryLeftPress,
  HeaderAccessoryRightIconComponent,
  onHeaderAccessoryRightPress,
  footer,
  scrollable,
  backgroundColorStatus,
  disablePaddingBottom,
  backgroundIllustration = AppIllustration.shepherdsAroundFire,
}: AppScreenLayoutProps) => {
  const { paddingTop, paddingBottom } = useAppSafeAreaPadding();

  const maybeHeader = headerTitle ? (
    <AppHeader
      title={headerTitle}
      accessoryLeft={headerAccessoryLeft}
      onAccessoryLeftPress={onHeaderAccessoryLeftPress}
      AccessoryRightIconComponent={HeaderAccessoryRightIconComponent}
      onAccessoryRightPress={onHeaderAccessoryRightPress}
    />
  ) : undefined;

  const screenPaddingBottom: AppSizeUnion = disablePaddingBottom
    ? 0
    : paddingBottom;

  const contentPaddingBottom: AppSizeUnion = disablePaddingBottom ? 0 : 'm';

  const content = scrollable ? <ScrollView>{children}</ScrollView> : children;

  return (
    <AppView>
      <AppScreenBackground illustrationName={backgroundIllustration} />
      <AppView
        paddingHorizontal={'m'}
        paddingTop={paddingTop}
        paddingBottom={screenPaddingBottom}
        backgroundColorStatus={backgroundColorStatus}
        height={FILL_CONTAINER_DIMENSION}>
        {maybeHeader}
        <AppView
          grow
          shrink
          paddingTop={'m'}
          paddingBottom={contentPaddingBottom}>
          {content}
        </AppView>
        {footer}
      </AppView>
    </AppView>
  );
};
