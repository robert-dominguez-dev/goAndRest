import { AppView, AppViewProps } from '../../AppView/AppView.tsx';
import { useAppSafeAreaPadding } from '../../../../hooks/useAppSafeAreaPadding.ts';
import { ChildrenProp } from '../../../../types/common.ts';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { FILL_CONTAINER_DIMENSION } from '../../../../constants/common.ts';
import { memo } from 'react';
import {
  getBottomSheetContentHeader,
  GetBottomSheetContentHeaderParams,
} from '../helpers/getBottomSheetContentHeader.tsx';
import { getPressableOpacity } from '../../../controls/helpers/getPressableOpacity.ts';
import { preventDefaultHandler } from '../../../../helpers/preventDefaultHandler.ts';
import {
  getOnPressWithHapticFeedbackConditionally
} from '../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useIsTabletAndLandscape } from '../../../../hooks/useIsTabletAndLandscape.ts';

export type AppBottomSheetContentProps = ChildrenProp &
  GetBottomSheetContentHeaderParams &
  Pick<AppViewProps, 'backgroundColorStatus'> & {
    scrollable?: boolean;
    onBottomSheetPress?: () => void;
  };

const AppBottomSheetContentComponent = ({
  children,
  title,
  onClose,
  headerOverride,
  accessoryRightIconName,
  onAccessoryRightPress,
  onBottomSheetPress,
  backgroundColorStatus = 'backgroundAlt',
  scrollable = false,
}: AppBottomSheetContentProps) => {
  const { safeAreaPaddingBottom } = useAppSafeAreaPadding();

  const isTabletLandscape = useIsTabletAndLandscape();

  const maxWidth: AppViewProps['maxWidth'] = isTabletLandscape
    ? '50%'
    : undefined;

  const header = getBottomSheetContentHeader({
    title,
    headerOverride,
    onClose,
    accessoryRightIconName,
    onAccessoryRightPress,
  });

  return (
    <Pressable
      onPress={event => {
        preventDefaultHandler(event);
        getOnPressWithHapticFeedbackConditionally(onBottomSheetPress)?.(
          undefined,
        );
      }}>
      {({ pressed }) => {
        const opacity = getPressableOpacity({
          pressed,
          disabled: false,
        });

        const reversedOpacity = 1 - opacity;

        return (
          <AppView
            grow
            disableBorderBottom
            maxHeight={FILL_CONTAINER_DIMENSION}
            width={FILL_CONTAINER_DIMENSION}
            maxWidth={maxWidth}
            alignSelf={'flex-end'}
            gap={'m'}
            paddingTop={'m'}
            paddingHorizontal={'m'}
            paddingBottom={safeAreaPaddingBottom}
            backgroundColorStatus={backgroundColorStatus}
            borderTopLeftRadius={'m'}
            borderTopRightRadius={'m'}
            borderColorStatus={'border'}
            borderWidthOverride={1}>
            <AppView
              {...StyleSheet.absoluteFill}
              opacity={reversedOpacity}
              backgroundColorStatus={'backgroundAlt'}
              borderTopLeftRadius={'m'}
              borderTopRightRadius={'m'}
            />
            {header}
            {!!children && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                scrollEnabled={scrollable}>
                {children}
              </ScrollView>
            )}
          </AppView>
        );
      }}
    </Pressable>
  );
};

export const AppBottomSheetContent = memo(AppBottomSheetContentComponent);
