import { AppText, AppTextProps } from './AppText/AppText.tsx';

export type MultiColorTextPart = Pick<AppTextProps, 'colorStatus'> & {
  text: string;
};

export type AppMultiColorTextProps = Omit<
  AppTextProps,
  'colorStatus' | 'children'
> & {
  textParts: MultiColorTextPart[];
};

export const AppMultiColorText = ({
  textParts,
  category,
  textShadowColorStatus,
  ...commonTextProps
}: AppMultiColorTextProps) => (
  <AppText
    {...commonTextProps}
    category={category}
    textShadowColorStatus={textShadowColorStatus}>
    {textParts.map(({ text, colorStatus }) => (
      <AppText
        key={text + colorStatus}
        colorStatus={colorStatus}
        category={category}
        textShadowColorStatus={textShadowColorStatus}>
        {text}
      </AppText>
    ))}
  </AppText>
);
