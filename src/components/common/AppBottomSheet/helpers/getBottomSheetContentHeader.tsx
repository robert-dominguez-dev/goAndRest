import { AppHeader, AppHeaderProps } from '../../AppHeader/AppHeader.tsx';
import { JSX } from 'react';

export type GetBottomSheetContentHeaderParams = Pick<
  AppHeaderProps,
  'AccessoryRightIconComponent' | 'title' | 'onAccessoryRightPress'
> & {
  headerOverride?: JSX.Element;
  onClose: () => void;
};

export const getBottomSheetContentHeader = ({
  title,
  headerOverride,
  onClose,
  onAccessoryRightPress,
  AccessoryRightIconComponent,
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
      AccessoryRightIconComponent={AccessoryRightIconComponent}
      onAccessoryRightPress={handleAccessoryRightPress}
    />
  );
};
