import { AppRow } from './AppRow.tsx';
import { AppView } from './AppView/AppView.tsx';
import { AppText } from './AppText/AppText.tsx';
import { AppIcon, AppIconName } from './AppIcon.tsx';
import { ChildrenProp } from '../../types/common.ts';
import { AppColorUnion } from '../../types/ui.ts';
import { UNLIMITED_NUMBER_OF_LINES } from '../../constants/common.ts';

type AppHintProps = ChildrenProp & {
  iconName?: AppIconName;
  colorStatus?: AppColorUnion;
  backgroundColorStatus?: AppColorUnion;
};

export const AppHint = ({
  children,
  iconName = 'Info',
  colorStatus = 'border',
  backgroundColorStatus = 'backgroundAlt',
}: AppHintProps) => {
  return (
    <AppRow
      gap={'s'}
      padding={'sm'}
      borderRadius={'s'}
      borderColorStatus={colorStatus}
      backgroundColorStatus={backgroundColorStatus}
      alignItems={'center'}>
      <AppIcon
        name={iconName}
        colorStatus={colorStatus}
      />
      <AppView
        grow
        shrink>
        <AppText
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}
          colorStatus={'textMuted'}>
          {children}
        </AppText>
      </AppView>
    </AppRow>
  );
};
