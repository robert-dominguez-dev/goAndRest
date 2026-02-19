import { AppView, AppViewProps } from '../../AppView/AppView.tsx';
import { useAppSafeAreaPadding } from '../../../../hooks/useAppSafeAreaPadding.ts';
import { ChildrenProp } from '../../../../types/common.ts';
import { ScrollView } from 'react-native';
import { FILL_CONTAINER_DIMENSION } from '../../../../constants/common.ts';
import { memo } from 'react';
import {
  getBottomSheetContentHeader,
  GetBottomSheetContentHeaderParams,
} from '../helpers/getBottomSheetContentHeader.tsx';
import { AppBottomSheetButtonProps } from './AppBottomSheetButton.tsx';

export type BottomSheetSubmitButtonProps = Omit<
  AppBottomSheetButtonProps,
  'onPress'
> & {
  onPress: (closeBottomSheet: () => void) => void;
};

export type AppBottomSheetContentProps = ChildrenProp &
  GetBottomSheetContentHeaderParams &
  Pick<AppViewProps, 'backgroundColorStatus'> & {
    scrollable?: boolean;
  };

const AppBottomSheetContentComponent = ({
  children,
  title,
  onClose,
  closeable,
  headerOverride,
  AccessoryRightIconComponent,
  onAccessoryRightPress,
  backgroundColorStatus = 'backgroundAlt',
  scrollable = true,
}: AppBottomSheetContentProps) => {
  const { safeAreaPaddingBottom } = useAppSafeAreaPadding();

  const header = getBottomSheetContentHeader({
    title,
    headerOverride,
    closeable,
    onClose,
    AccessoryRightIconComponent,
    onAccessoryRightPress,
  });

  return (
    <AppView
      grow
      disableBorderBottom
      maxHeight={FILL_CONTAINER_DIMENSION}
      gap={'m'}
      paddingTop={'m'}
      paddingHorizontal={'m'}
      paddingBottom={safeAreaPaddingBottom}
      backgroundColorStatus={backgroundColorStatus}
      borderTopLeftRadius={'m'}
      borderTopRightRadius={'m'}
      borderColorStatus={'border'}
      borderWidthOverride={1}>
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
};

export const AppBottomSheetContent = memo(AppBottomSheetContentComponent);
