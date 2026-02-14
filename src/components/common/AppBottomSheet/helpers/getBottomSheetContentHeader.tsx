import { AppHeader, AppHeaderProps } from '../../AppHeader/AppHeader.tsx';
import { JSX } from 'react';

export type GetBottomSheetContentHeaderParams = Pick<
  AppHeaderProps,
  'AccessoryRightIconComponent'
> & {
  title: string | undefined;
  headerOverride?: JSX.Element;
  closeable?: boolean;
  onClose: () => void;
};

export const getBottomSheetContentHeader = ({
  title,
  headerOverride,
  onClose,
  AccessoryRightIconComponent,
}: GetBottomSheetContentHeaderParams) => {
  if (headerOverride) {
    return headerOverride;
  }

  if (!title) {
    return undefined;
  }

  return (
    <AppHeader
      title={title}
      AccessoryRightIconComponent={AccessoryRightIconComponent}
      onAccessoryRightPress={onClose}
    />
  );
};
