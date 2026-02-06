import { AppHeader } from '../../AppHeader/AppHeader.tsx';
import { AppIcon } from '../../../icons/constants.tsx';

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

  const accessoryRightIconName = closeable ? AppIcon.close : undefined;

  return (
    <AppHeader
      title={title}
      AccessoryRightIconComponent={accessoryRightIconName}
      onAccessoryRightPress={onClose}
    />
  );
};
