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
    100: '#BEF5EC',
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
    50: '#ff7b89',
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
  primary: appDesignSystemColors.primary['400'],
  primaryMuted: appDesignSystemColors.primary['400'],
  negative: appDesignSystemColors.negative['300'],
  negativeMuted: appDesignSystemColors.negative['200'],
  text: appDesignSystemColors.grayscale['700'],
  background: appDesignSystemColors.grayscale['50'],
  backgroundAlt: appDesignSystemColors.grayscale['200'],
  slider: appDesignSystemColors.grayscale['700'],
  prep: '#e6c003',
  work: appDesignSystemColors.negative['300'],
  rest: appDesignSystemColors.primary['300'],
  rounds: appDesignSystemColors.grayscale['300'],
  cooldown: '#E3940B',
  semiTransparentOverlay: '#00000080',
  transparent: '#00000000',
} as const satisfies Record<string, HexColor>;

export type AppColorName = keyof typeof appColorsLight;
export type AppColors = Record<AppColorName, HexColor>;

export const appColorsDark = {
  primary: appDesignSystemColors.primary['500'],
  primaryMuted: appDesignSystemColors.primary['0'],
  negative: appDesignSystemColors.negative['400'],
  negativeMuted: appDesignSystemColors.negative['50'],
  text: appDesignSystemColors.grayscale['100'],
  background: appDesignSystemColors.grayscale['800'],
  backgroundAlt: appDesignSystemColors.grayscale['600'],
  slider: appDesignSystemColors.grayscale['100'],
  prep: '#a18703',
  work: '#c50824',
  rest: '#10a590',
  rounds: appDesignSystemColors.grayscale['500'],
  cooldown: '#d18707',
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
    appDesignSystemColors.grayscale['100'],
    appDesignSystemColors.grayscale['400'],
  ],
  negative: [
    appDesignSystemColors.negative['100'],
    appDesignSystemColors.negative['500'],
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
    appDesignSystemColors.grayscale['500'],
    appDesignSystemColors.grayscale['700'],
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
