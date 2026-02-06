import { AppSizeUnion } from '../../types/ui.ts';
import { AppView } from './AppView.tsx';
import { FILL_CONTAINER_DIMENSION } from '../../constants/common.ts';
import { getAppSize } from '../../helpers/getAppSize.ts';

type AppSpacerProps = {
  size?: AppSizeUnion;
  isVertical?: boolean;
};

export const AppSpacer = ({ isVertical, size = 'm' }: AppSpacerProps) => {
  if (isVertical) {
    return (
      <AppView height={FILL_CONTAINER_DIMENSION} width={getAppSize(size)} />
    );
  }

  return <AppView height={getAppSize(size)} width={FILL_CONTAINER_DIMENSION} />;
};
