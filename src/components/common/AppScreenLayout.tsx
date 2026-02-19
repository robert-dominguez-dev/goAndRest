import { AppView, AppViewProps } from './AppView/AppView.tsx';
import { ScrollView } from 'react-native';
import { FILL_CONTAINER_DIMENSION } from '../../constants/common.ts';
import { AppScreenBackground, AppScreenBackgroundProps, } from './AppScreenBackground.tsx';
import { AppHeader, AppHeaderProps } from './AppHeader/AppHeader.tsx';
import { ReactNode } from 'react';

import { useAppSafeAreaPadding } from '../../hooks/useAppSafeAreaPadding.ts';
import { AppSize, AppSizeUnion } from '../../types/ui.ts';

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
    backgroundIllustration?: AppScreenBackgroundProps['illustrationName'];
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
  backgroundIllustration,
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
    <AppView>
      {backgroundIllustration && (
        <AppScreenBackground illustrationName={backgroundIllustration} />
      )}
      <AppView
        paddingHorizontal={HORIZONTAL_SCREEN_PADDING}
        paddingTop={screenPaddingTop}
        paddingBottom={screenPaddingBottom}
        backgroundColorStatus={backgroundColorStatus}
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
