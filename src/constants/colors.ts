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

const appDesignSystemColors: Record<string, DesignSystemColors> = {
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
  secondary: {
    0: '#7dbeff',
    50: '#43a1ff',
    100: '#1c8dff',
    200: '#0079f3',
    300: '#0065cb',
    400: '#0053a5',
    500: '#044687',
    600: '#073a6d',
    700: '#082e54',
    800: '#08233d',
    900: '#071727',
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
};

export const appColorsLight = {
  primary: appDesignSystemColors.primary['600'],
  primaryMuted: appDesignSystemColors.primary['400'],
  secondary: appDesignSystemColors.secondary['600'],
  secondaryMuted: appDesignSystemColors.secondary['400'],
  secondaryStrong: appDesignSystemColors.secondary['0'],
  secondaryDeep: appDesignSystemColors.secondary['50'],
  negative: appDesignSystemColors.negative['600'],
  negativeMuted: appDesignSystemColors.negative['400'],
  text: appDesignSystemColors.grayscale['900'],
  background: appDesignSystemColors.grayscale['50'],
  backgroundAlt: appDesignSystemColors.grayscale['400'],
  pink: '#a50076',
  pinkDark: '#6a004c',
  green: '#089146',
  greenDark: '#055e2e',
  blue: '#06a7d4',
  blueDark: '#0084a9',
  yellow: '#d9c000',
  yellowDark: '#aa9602',
  brown: '#914808',
  brownDark: '#683406',
  semiTransparentOverlay: '#00000080',
} as const satisfies Record<string, HexColor>;

export type AppColorName = keyof typeof appColorsLight;
export type AppColors = Record<AppColorName, HexColor>;

export const appColorsDark = {
  primary: appDesignSystemColors.primary['400'],
  primaryMuted: appDesignSystemColors.primary['0'],
  secondary: appDesignSystemColors.secondary['400'],
  secondaryMuted: appDesignSystemColors.secondary['0'],
  secondaryStrong: appDesignSystemColors.secondary['600'],
  secondaryDeep: appDesignSystemColors.secondary['800'],
  negative: appDesignSystemColors.negative['400'],
  negativeMuted: appDesignSystemColors.negative['0'],
  text: appDesignSystemColors.grayscale['50'],
  background: appDesignSystemColors.grayscale['800'],
  backgroundAlt: appDesignSystemColors.grayscale['600'],
  pink: appColorsLight.pink,
  pinkDark: appColorsLight.pinkDark,
  green: appColorsLight.green,
  greenDark: appColorsLight.greenDark,
  blue: appColorsLight.blue,
  blueDark: appColorsLight.blueDark,
  yellow: appColorsLight.yellow,
  yellowDark: appColorsLight.yellowDark,
  brown: appColorsLight.brown,
  brownDark: appColorsLight.brownDark,
  semiTransparentOverlay: appColorsLight.semiTransparentOverlay,
} as const satisfies AppColors;

type GradientColor = [HexColor, HexColor];

export const appLinearGradientColorsLight = {
  primary: [
    appDesignSystemColors.primary['200'],
    appDesignSystemColors.primary['600'],
  ],
  secondary: [
    appDesignSystemColors.secondary['100'],
    appDesignSystemColors.secondary['500'],
  ],
  negative: [
    appDesignSystemColors.negative['200'],
    appDesignSystemColors.negative['600'],
  ],
} satisfies Record<string, GradientColor>;

export type AppGradientColorUnion = keyof typeof appLinearGradientColorsLight;
export type AppGradientColors = Record<AppGradientColorUnion, GradientColor>;

export const appLinearGradientColorsDark = {
  primary: [
    appDesignSystemColors.primary['200'],
    appDesignSystemColors.primary['600'],
  ],
  secondary: [
    appDesignSystemColors.secondary['100'],
    appDesignSystemColors.secondary['500'],
  ],
  negative: [
    appDesignSystemColors.negative['200'],
    appDesignSystemColors.negative['600'],
  ],
} satisfies AppGradientColors;
