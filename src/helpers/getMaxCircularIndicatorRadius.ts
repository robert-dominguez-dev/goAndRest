import { Dimensions } from 'react-native';

type GetMaxCircularIndicatorRadiusParams = {
  paddingTotal: number;
  strokeWidth: number;
};

export const getMaxCircularIndicatorRadius = ({
  strokeWidth,
  paddingTotal,
}: GetMaxCircularIndicatorRadiusParams) => {
  const screenWidth = Dimensions.get('window').width;
  return (screenWidth - paddingTotal) / 2 - strokeWidth;
};
