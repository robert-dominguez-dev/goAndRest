import { AppView } from './AppView.tsx';
import { FILL_CONTAINER_DIMENSION } from '../../constants/common.ts';
import { AppImage } from './AppImage.tsx';
import { AppIllustration } from '../../assets/constants.ts';

type AppScreenBackgroundIllustration =
  | AppIllustration.shepherdsAroundFire
  | AppIllustration.ancientCityAtNight
  | AppIllustration.ancientCityAtNightWithStairs
  | AppIllustration.ancientPillarsAtNight
  | AppIllustration.ancientRocksAtNight;

export type AppScreenBackgroundProps = {
  illustrationName: AppScreenBackgroundIllustration;
};

export const AppScreenBackground = ({
  illustrationName,
}: AppScreenBackgroundProps) => (
  <AppView
    height={FILL_CONTAINER_DIMENSION}
    width={FILL_CONTAINER_DIMENSION}
    position={'absolute'}>
    <AppImage illustrationName={illustrationName} />
  </AppView>
);
