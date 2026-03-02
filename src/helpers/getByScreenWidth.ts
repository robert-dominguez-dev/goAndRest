import { Dimensions } from 'react-native';

const SMALL_DEVICE_THRESHOLD = 380;

type GetByScreenWidthParams<TValue> = {
  small: TValue;
  standard: TValue;
};

export const getByScreenWidth = <TValue>({
  small,
  standard,
}: GetByScreenWidthParams<TValue>) => {
  const screenWidth = Dimensions.get('window').width;
  const isSmallDevice = screenWidth < SMALL_DEVICE_THRESHOLD;
  return isSmallDevice ? small : standard;
};
