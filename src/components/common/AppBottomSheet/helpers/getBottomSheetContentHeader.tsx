import { AppHeader, AppHeaderProps } from '../../AppHeader/AppHeader.tsx';
import { JSX } from 'react';

export type GetBottomSheetContentHeaderParams = Pick<
  AppHeaderProps,
  'accessoryRightIconName' | 'title' | 'onAccessoryRightPress'
> & {
  headerOverride?: JSX.Element;
  onClose: () => void;
};

export const getBottomSheetContentHeader = ({
  title,
  headerOverride,
  onClose,
  onAccessoryRightPress,
  accessoryRightIconName,
}: GetBottomSheetContentHeaderParams) => {
  if (headerOverride) {
    return headerOverride;
  }

  if (!title) {
    return undefined;
  }

  const handleAccessoryRightPress: AppHeaderProps['onAccessoryRightPress'] =
    onAccessoryRightPress
      ? () => {
          onAccessoryRightPress();
          onClose();
        }
      : undefined;

  return (
    <AppHeader
      title={title}
      accessoryRightIconName={accessoryRightIconName}
      onAccessoryRightPress={handleAccessoryRightPress}
    />
  );
};
