import { AppView } from '../../AppView.tsx';
import { useAppSafeAreaPadding } from '../../../../hooks/useAppSafeAreaPadding.ts';
import { ChildrenProp } from '../../../../types/common.ts';
import { ScrollView } from 'react-native';
import { FILL_CONTAINER_DIMENSION } from '../../../../constants/common.ts';
import { memo } from 'react';
import {
  getBottomSheetContentHeader,
  GetBottomSheetContentHeaderParams,
} from '../helpers/getBottomSheetContentHeader.tsx';
import {
  AppBottomSheetButton,
  AppBottomSheetButtonProps,
} from './AppBottomSheetButton.tsx';

export type BottomSheetSubmitButtonProps = Omit<
  AppBottomSheetButtonProps,
  'onPress'
> & {
  onPress: (closeBottomSheet: () => void) => void;
};

export type AppBottomSheetContentProps = ChildrenProp &
  GetBottomSheetContentHeaderParams & {
    bottomSheetSubmitButtonProps?: BottomSheetSubmitButtonProps;
    scrollable?: boolean;
  };

const _AppBottomSheetContent = ({
  children,
  title,
  onClose,
  closeable,
  bottomSheetSubmitButtonProps,
  headerOverride,
  scrollable = true,
}: AppBottomSheetContentProps) => {
  const { paddingBottom } = useAppSafeAreaPadding();

  const maybeInnerBottomSheetButton = bottomSheetSubmitButtonProps ? (
    <AppBottomSheetButton
      {...bottomSheetSubmitButtonProps}
      onPress={() => bottomSheetSubmitButtonProps.onPress(onClose)}
    />
  ) : undefined;

  const maybeBottomSheetContent =
    scrollable && children ? (
      <ScrollView keyboardShouldPersistTaps={'handled'}>{children}</ScrollView>
    ) : (
      children
    );

  const header = getBottomSheetContentHeader({
    title,
    headerOverride,
    closeable,
    onClose,
  });

  return (
    <AppView
      grow
      disableBorderBottom
      maxHeight={FILL_CONTAINER_DIMENSION}
      gap={'l'}
      paddingTop={'m'}
      paddingHorizontal={'m'}
      paddingBottom={paddingBottom}
      backgroundColorStatus={'secondaryVeryDark'}
      borderColorStatus={'secondaryDark'}
      borderTopLeftRadius={'m'}
      borderTopRightRadius={'m'}>
      {header}
      {maybeBottomSheetContent}
      {maybeInnerBottomSheetButton}
    </AppView>
  );
};

export const AppBottomSheetContent = memo(_AppBottomSheetContent);
