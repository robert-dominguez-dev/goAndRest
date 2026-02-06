import { DimensionValue, Platform } from 'react-native';

export const IS_DEV_MODE = __DEV__;

export const IS_ANDROID = Platform.OS === 'android';

export const FILL_CONTAINER_DIMENSION: DimensionValue = '100%';

export const UNLIMITED_NUMBER_OF_LINES = 0;

export const EMPTY_OBJECT_STRING = '{}';

export const ONE_SECOND_MS = 1000;

export const ONE_MINUTE_SECONDS = 60;

export const POP_UP_Z_INDEX = 1000;

export const DEFAULT_POLLING_INTERVAL_IN_MS = 2000;

export const NOT_KNOWN_PLACEHOLDER = '???';

export const EMPTY_SPACE = ' ';

export const DASH = '-';

export const COMMA = ',';

export const COMMA_SPACE = COMMA + EMPTY_SPACE;

export const DOT = '.';
