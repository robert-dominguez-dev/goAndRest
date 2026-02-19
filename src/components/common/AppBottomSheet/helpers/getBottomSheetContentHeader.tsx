import { AppHeader, AppHeaderProps } from '../../AppHeader/AppHeader.tsx';
import { JSX } from 'react';
import { X } from 'lucide-react-native';

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
  AccessoryRightIconComponent = X,
}: GetBottomSheetContentHeaderParams) => {
  if (headerOverride) {
    return headerOverride;
  }

  if (!title) {
    return undefined;
  }

  const handleAccessoryRightPress = () => {
    onAccessoryRightPress?.();
    onClose();
  };

  return (
    <AppHeader
      title={title}
      AccessoryRightIconComponent={AccessoryRightIconComponent}
      onAccessoryRightPress={handleAccessoryRightPress}
    />
  );
};
