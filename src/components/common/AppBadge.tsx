import { AppView } from './AppView/AppView.tsx';
import { AppText } from './AppText/AppText.tsx';
import { AppStatus, appStatusUIMap } from './appStatusColors.ts';

type AppBadgeProps = {
  label: string;
  status?: AppStatus;
};

export const AppBadge = ({ label, status = 'info' }: AppBadgeProps) => {
  const { text, background } = appStatusUIMap[status];

  return (
    <AppView
      backgroundColorStatus={background}
      paddingHorizontal={'s'}
      paddingVertical={'xxs'}
      borderRadius={'xs'}>
      <AppText
        category={'contentBold'}
        fontSizeOverride={14}
        grow={false}
        colorStatus={text}>
        {label}
      </AppText>
    </AppView>
  );
};
