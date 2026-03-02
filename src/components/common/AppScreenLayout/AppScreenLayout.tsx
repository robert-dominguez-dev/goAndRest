import { AppView, AppViewProps } from '../AppView/AppView.tsx';
import { ScrollView } from 'react-native';
import { FILL_CONTAINER_DIMENSION } from '../../../constants/common.ts';
import { AppHeader, AppHeaderProps } from '../AppHeader/AppHeader.tsx';
import { JSX, ReactNode } from 'react';

import { useAppSafeAreaPadding } from '../../../hooks/useAppSafeAreaPadding.ts';
import { AppSize, AppSizeUnion } from '../../../types/ui.ts';
import { AppScreenLayoutBackgroundOverlay } from './components/AppScreenLayoutWallpaper.tsx';

export const HORIZONTAL_SCREEN_PADDING = AppSize.m;

export type AppScreenLayoutProps = Pick<AppViewProps, 'children'> &
  Pick<AppViewProps, 'backgroundColorStatus'> & {
    headerTitle?: AppHeaderProps['title'];
    HeaderAccessoryRightIconComponent?: AppHeaderProps['AccessoryRightIconComponent'];
    HeaderAccessoryLeftIconComponent?: AppHeaderProps['AccessoryLeftIconComponent'];
    onHeaderAccessoryRightPress?: AppHeaderProps['onAccessoryRightPress'];
    onHeaderAccessoryLeftPress?: AppHeaderProps['onAccessoryLeftPress'];
    footer?: ReactNode;
    scrollable?: boolean;
    backgroundOverlayElement?: JSX.Element;
    screenPaddingTopOverride?: AppSizeUnion;
  };

export const AppScreenLayout = ({
  children,
  headerTitle,
  HeaderAccessoryLeftIconComponent,
  onHeaderAccessoryLeftPress,
  HeaderAccessoryRightIconComponent,
  onHeaderAccessoryRightPress,
  footer,
  scrollable,
  backgroundOverlayElement,
  screenPaddingTopOverride,
  backgroundColorStatus = 'background',
}: AppScreenLayoutProps) => {
  const { safeAreaPaddingTop, safeAreaPaddingBottom } = useAppSafeAreaPadding();

  const maybeHeader = headerTitle ? (
    <AppHeader
      title={headerTitle}
      AccessoryLeftIconComponent={HeaderAccessoryLeftIconComponent}
      onAccessoryLeftPress={onHeaderAccessoryLeftPress}
      AccessoryRightIconComponent={HeaderAccessoryRightIconComponent}
      onAccessoryRightPress={onHeaderAccessoryRightPress}
    />
  ) : undefined;

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
        paddingHorizontal={HORIZONTAL_SCREEN_PADDING}
        paddingTop={screenPaddingTop}
        paddingBottom={screenPaddingBottom}
        height={FILL_CONTAINER_DIMENSION}>
        {maybeHeader}
        <AppView
          grow
          shrink
          paddingTop={'l'}
          paddingBottom={contentPaddingBottom}>
          {content}
        </AppView>
        {footer}
      </AppView>
    </AppView>
  );
};
