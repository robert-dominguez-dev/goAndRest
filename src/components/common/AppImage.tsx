import { Image, ImageResizeMode, ImageStyle } from 'react-native';
import { FILL_CONTAINER_DIMENSION } from '../../constants/common.ts';
import { AppIllustration, appIllustrations } from '../../assets/constants.ts';
import { AppSizeUnion } from '../../types/ui.ts';
import { getAppSize } from '../../helpers/getAppSize.ts';
import { memo } from 'react';

const FILL_CONTAINER_STYLE: ImageStyle = {
  flex: 1,
  width: FILL_CONTAINER_DIMENSION,
};

/**
 * Either we fill both width and height,
 * or none of them.
 */
type AppImageDimensions =
  | Required<Pick<ImageStyle, 'width' | 'height'>>
  | { width?: never; height?: never };

export type AppImageProps = AppImageDimensions &
  Pick<ImageStyle, 'opacity'> & {
    illustrationName: AppIllustration;
    borderRadius?: AppSizeUnion;
  };

const _AppImage = ({
  illustrationName,
  opacity,
  borderRadius,
  width,
  height,
}: AppImageProps) => {
  const hasDimensionsFilled = width && height;

  const resizeMode: ImageResizeMode = hasDimensionsFilled ? 'contain' : 'cover';

  const imageDimensionsStyle: ImageStyle = hasDimensionsFilled
    ? {
        width,
        height,
      }
    : FILL_CONTAINER_STYLE;

  const imageStyle: ImageStyle = {
    ...imageDimensionsStyle,
    opacity,
    borderRadius: getAppSize(borderRadius),
  };

  return (
    <Image
      source={appIllustrations[illustrationName]}
      resizeMode={resizeMode}
      style={imageStyle}
    />
  );
};

export const AppImage = memo(_AppImage);
