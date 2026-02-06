import { AppText, AppTextProps } from './AppText/AppText.tsx';
import { AppRow } from './AppRow.tsx';

export type AppTitleValueRowProps = Pick<
  AppTextProps,
  'textShadowColorStatus'
> & {
  title: string;
  value: string | undefined;
};

export const AppTitleValueRow = ({
  title,
  value,
  textShadowColorStatus,
}: AppTitleValueRowProps) => (
  <AppRow gap={'xs'}>
    <AppText
      grow={false}
      colorStatus={'primary'}
      category={'subHeader'}
      textShadowColorStatus={textShadowColorStatus}>
      {title}:
    </AppText>
    <AppText
      category={'subHeader'}
      textShadowColorStatus={textShadowColorStatus}>
      {value ?? 'Undefined'}
    </AppText>
  </AppRow>
);
