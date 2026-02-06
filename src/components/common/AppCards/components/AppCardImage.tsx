import { AppImage, AppImageProps } from '../../AppImage.tsx';
import { AppView } from '../../AppView.tsx';
import { sizes } from '../../../../constants/ui.ts';
import { AppColorUnion } from '../../../../types/ui.ts';

export type AppCardImageProps = Pick<
  AppImageProps,
  'illustrationName' | 'height' | 'width'
> & {
  colorStatus: AppColorUnion | undefined;
};

export const AppCardImage = ({
  illustrationName,
  height,
  width,
  colorStatus,
}: AppCardImageProps) => (
  <AppView
    height={height}
    width={width}
    borderRadius={sizes.cardBorderRadius}
    backgroundColorStatus={colorStatus}
    borderColorStatus={colorStatus}>
    <AppImage
      borderRadius={'xxs'}
      illustrationName={illustrationName}
    />
  </AppView>
);
