import { AppView, AppViewProps } from '../AppView/AppView.tsx';
import { ScrollView } from 'react-native';
import { FILL_CONTAINER_DIMENSION } from '../../../constants/common.ts';
import { AppHeader, AppHeaderProps } from '../AppHeader/AppHeader.tsx';
import { JSX, ReactNode } from 'react';

import { useAppSafeAreaPadding } from '../../../hooks/useAppSafeAreaPadding.ts';
import { AppSizeUnion } from '../../../types/ui.ts';
import { AppScreenLayoutBackgroundOverlay } from './components/AppScreenLayoutWallpaper.tsx';

export type AppScreenLayoutProps = Pick<AppViewProps, 'children'> &
  Pick<AppViewProps, 'backgroundColorStatus'> & {
    headerElementOverride?: JSX.Element;
    headerTitle?: AppHeaderProps['title'];
    headerAccessoryRightIconName?: AppHeaderProps['accessoryRightIconName'];
    headerAccessoryLeftIconName?: AppHeaderProps['accessoryLeftIconName'];
    onHeaderAccessoryRightPress?: AppHeaderProps['onAccessoryRightPress'];
    onHeaderAccessoryLeftPress?: AppHeaderProps['onAccessoryLeftPress'];
    footer?: ReactNode;
    scrollable?: boolean;
    backgroundOverlayElement?: JSX.Element;
    screenPaddingTopOverride?: AppSizeUnion;
    contentPaddingTopOverride?: AppSizeUnion;
  };

export const AppScreenLayout = ({
  children,
  headerTitle,
  headerElementOverride,
  headerAccessoryLeftIconName,
  onHeaderAccessoryLeftPress,
  headerAccessoryRightIconName,
  onHeaderAccessoryRightPress,
  footer,
  scrollable,
  backgroundOverlayElement,
  screenPaddingTopOverride,
  contentPaddingTopOverride,
  backgroundColorStatus = 'background',
}: AppScreenLayoutProps) => {
  const {
    safeAreaPaddingTop,
    safeAreaPaddingBottom,
    safeAreaPaddingLeft,
    safeAreaPaddingRight,
  } = useAppSafeAreaPadding();

  const maybeHeader: JSX.Element | undefined = headerTitle ? (
    <AppHeader
      title={headerTitle}
      accessoryLeftIconName={headerAccessoryLeftIconName}
      onAccessoryLeftPress={onHeaderAccessoryLeftPress}
      accessoryRightIconName={headerAccessoryRightIconName}
      onAccessoryRightPress={onHeaderAccessoryRightPress}
    />
  ) : undefined;

  const headerEvaluated: JSX.Element | undefined =
    headerElementOverride || maybeHeader;

  const screenPaddingTop: AppSizeUnion =
    screenPaddingTopOverride ?? safeAreaPaddingTop;

  const screenPaddingBottom: AppSizeUnion = footer ? safeAreaPaddingBottom : 0;

  const contentPaddingBottom: AppSizeUnion = footer ? 'l' : 0;

  const content: ReactNode = scrollable ? (
    <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
  ) : (
    children
  );

  return (
    <AppView backgroundColorStatus={backgroundColorStatus}>
      {backgroundOverlayElement && (
        <AppScreenLayoutBackgroundOverlay>
          {backgroundOverlayElement}
        </AppScreenLayoutBackgroundOverlay>
      )}
      <AppView
        paddingTop={screenPaddingTop}
        paddingBottom={screenPaddingBottom}
        paddingLeft={safeAreaPaddingLeft}
        paddingRight={safeAreaPaddingRight}
        height={FILL_CONTAINER_DIMENSION}>
        {headerEvaluated}
        <AppView
          grow
          shrink
          paddingTop={contentPaddingTopOverride ?? 'l'}
          paddingBottom={contentPaddingBottom}>
          {content}
        </AppView>
        {footer}
      </AppView>
    </AppView>
  );
};
