import { AppRow } from './AppRow.tsx';
import { AppView } from './AppView/AppView.tsx';
import { AppText } from './AppText/AppText.tsx';
import { AppIcon } from './AppIcon.tsx';
import { ChildrenProp } from '../../types/common.ts';
import { AppStatus, appStatusUIMap } from './appStatusColors.ts';
import { UNLIMITED_NUMBER_OF_LINES } from '../../constants/common.ts';

type AppHintProps = ChildrenProp & {
  status?: AppStatus;
};

export const AppHint = ({ children, status = 'info' }: AppHintProps) => {
  const { iconName, text, background } = appStatusUIMap[status];

  return (
    <AppRow
      gap={'s'}
      padding={'sm'}
      borderRadius={'s'}
      borderColorStatus={text}
      backgroundColorStatus={background}
      alignItems={'center'}>
      <AppIcon
        name={iconName}
        colorStatus={text}
      />
      <AppView
        grow
        shrink>
        <AppText
          category={'contentBold'}
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}
          colorStatus={text}>
          {children}
        </AppText>
      </AppView>
    </AppRow>
  );
};
