import { AppHeader, AppHeaderProps } from '../../AppHeader/AppHeader.tsx';
import { JSX } from 'react';
import { CircleX } from 'lucide-react-native';

export type GetBottomSheetContentHeaderParams = {
  title: string | undefined;
  headerOverride?: JSX.Element;
  closeable?: boolean;
  onClose: () => void;
};

export const getBottomSheetContentHeader = ({
  title,
  headerOverride,
  closeable,
  onClose,
}: GetBottomSheetContentHeaderParams) => {
  if (headerOverride) {
    return headerOverride;
  }

  if (!title) {
    return undefined;
  }

  const AccessoryRightIconComponent: AppHeaderProps['AccessoryRightIconComponent'] =
    closeable ? CircleX : undefined;

  return (
    <AppHeader
      title={title}
      AccessoryRightIconComponent={AccessoryRightIconComponent}
      onAccessoryRightPress={onClose}
    />
  );
};
