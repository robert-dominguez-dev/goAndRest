import { AppColorUnion } from '../types/ui.ts';

type HexColor = `#${string}`;

type DesignSystemColors = {
  0: HexColor;
  50: HexColor;
  100: HexColor;
  200: HexColor;
  300: HexColor;
  400: HexColor;
  500: HexColor;
  600: HexColor;
  700: HexColor;
  800: HexColor;
  900: HexColor;
};

const appDesignSystemColors = {
  primary: {
    0: '#f3fdfb',
    50: '#E3FFFA',
    100: '#8de6d7',
    200: '#16F3CD',
    300: '#0BCFAD',
    400: '#19BDA0',
    500: '#1F8A77',
    600: '#195349',
    700: '#0c3a32',
    800: '#04221d',
    900: '#010c0a',
  },
  grayscale: {
    0: '#ffffff',
    50: '#eeeeee',
    100: '#dddddd',
    200: '#aaaaaa',
    300: '#888888',
    400: '#777777',
    500: '#555555',
    600: '#333333',
    700: '#222222',
    800: '#111111',
    900: '#000000',
  },
  negative: {
    0: '#ffb7be',
    50: '#f38181',
    100: '#ff5465',
    200: '#ff2c41',
    300: '#f70c23',
    400: '#d5071b',
    500: '#b80c1d',
    600: '#9d101e',
    700: '#83121d',
    800: '#6a131c',
    900: '#531219',
  },
} satisfies Record<string, DesignSystemColors>;

export const appColorsLight = {
  primary: appDesignSystemColors.primary['300'],
  negative: appDesignSystemColors.negative['100'],
  text: appDesignSystemColors.grayscale['700'],
  textMuted: appDesignSystemColors.grayscale['500'],
  background: appDesignSystemColors.grayscale['50'],
  backgroundAlt: appDesignSystemColors.grayscale['100'],
  border: appDesignSystemColors.grayscale['200'],
  inputBackground: appDesignSystemColors.grayscale['50'],
  inputText: appDesignSystemColors.grayscale['700'],
  inputTextMuted: appDesignSystemColors.grayscale['300'],
  slider: appDesignSystemColors.grayscale['700'],
  work: '#f38181',
  workStrong: '#d83535',
  rest: '#75e8d3',
  restStrong: '#12917a',
  series: '#cccccc',
  rounds: '#cccccc',
  brake: '#ecd883',
  brakeStrong: '#a68705',
  warmup: '#e69d6c',
  cooldown: '#a1d9e4',
  semiTransparentOverlay: '#000000BB',
  transparent: '#00000000',
} as const satisfies Record<string, HexColor>;

export type AppColorName = keyof typeof appColorsLight;
export type AppColors = Record<AppColorName, HexColor>;

export const appColorsDark = {
  primary: appDesignSystemColors.primary['500'],
  negative: appDesignSystemColors.negative['400'],
  text: appDesignSystemColors.grayscale['100'],
  textMuted: appDesignSystemColors.grayscale['300'],
  background: appDesignSystemColors.grayscale['800'],
  backgroundAlt: appDesignSystemColors.grayscale['700'],
  border: appDesignSystemColors.grayscale['600'],
  inputBackground: appDesignSystemColors.grayscale['100'],
  inputText: appDesignSystemColors.grayscale['700'],
  inputTextMuted: appDesignSystemColors.grayscale['400'],
  slider: appDesignSystemColors.grayscale['100'],
  work: '#d5253f',
  workStrong: '#df213d',
  rest: '#10a590',
  restStrong: '#1eccb3',
  series: appDesignSystemColors.grayscale['500'],
  rounds: appDesignSystemColors.grayscale['500'],
  brake: '#a18703',
  brakeStrong: '#cfaf0c',
  warmup: '#c86d25',
  cooldown: '#2699ae',
  semiTransparentOverlay: appColorsLight.semiTransparentOverlay,
  transparent: appColorsLight.transparent,
} as const satisfies AppColors;

type GradientColor = [HexColor, HexColor];

export const appLinearGradientColorsLight = {
  primary: [
    appDesignSystemColors.primary['200'],
    appDesignSystemColors.primary['500'],
  ],
  grayscale: [
    appDesignSystemColors.grayscale['0'],
    appDesignSystemColors.grayscale['200'],
  ],
  negative: [
    appDesignSystemColors.negative['50'],
    appDesignSystemColors.negative['400'],
  ],
  slider: [
    appDesignSystemColors.grayscale['500'],
    appDesignSystemColors.grayscale['900'],
  ],
} satisfies Record<string, GradientColor>;

export type AppGradientColorUnion = keyof typeof appLinearGradientColorsLight;
export type AppGradientColors = Record<AppGradientColorUnion, GradientColor>;

export const appLinearGradientColorsDark = {
  primary: [
    appDesignSystemColors.primary['200'],
    appDesignSystemColors.primary['600'],
  ],
  grayscale: [
    appDesignSystemColors.grayscale['600'],
    appDesignSystemColors.grayscale['800'],
  ],
  negative: [
    appDesignSystemColors.negative['200'],
    appDesignSystemColors.negative['600'],
  ],
  slider: [
    appDesignSystemColors.grayscale['0'],
    appDesignSystemColors.grayscale['300'],
  ],
} satisfies AppGradientColors;

export const gradientToStandardColorStatus: Record<
  AppGradientColorUnion,
  AppColorUnion
> = {
  primary: 'primary',
  negative: 'negative',
  grayscale: 'backgroundAlt',
  slider: 'slider',
};
