import { AppSize } from '../../../../types/ui.ts';
import { Dimensions } from 'react-native';

const DEFAULT_HORIZONTAL_PADDING = AppSize.m;
const WINDOW_WIDTH = Dimensions.get('window').width;

export const getDefaultCardsContainerWidth = () =>
  WINDOW_WIDTH - DEFAULT_HORIZONTAL_PADDING;
