import { AppRow } from '../AppRow.tsx';
import {
  AppHeaderAccessoryContainer,
  AppHeaderAccessoryContainerProps,
} from './components/AppHeaderAccessoryContainer.tsx';

import { JSX } from 'react';
import isString from 'lodash/isString';
import { AppIcon, AppIconName } from '../AppIcon.tsx';
import { AppText } from '../AppText/AppText.tsx';
import { AppViewProps } from '../AppView/AppView.tsx';
import { AppColorUnion } from '../../../types/ui.ts';

export type AppHeaderProps = {
  title?: string | JSX.Element;
  accessoryLeftIconName?: AppIconName;
  accessoryLeftIconColorStatus?: AppColorUnion;
  onAccessoryLeftPress?: AppHeaderAccessoryContainerProps['onPress'];
  accessoryRightIconName?: AppIconName;
  accessoryRightIconColorStatus?: AppColorUnion;
  onAccessoryRightPress?: AppHeaderAccessoryContainerProps['onPress'];
};

export const AppHeader = ({
  title,
  accessoryLeftIconName,
  accessoryLeftIconColorStatus,
  onAccessoryLeftPress,
  accessoryRightIconName,
  accessoryRightIconColorStatus,
  onAccessoryRightPress,
}: AppHeaderProps) => {
  const titleElement = isString(title) ? (
    <AppText
      textAlign={'center'}
      category={'header'}>
      {title}
    </AppText>
  ) : (
    title
  );

  const hasAnyAccessory: boolean =
    !!accessoryLeftIconName || !!accessoryRightIconName;

  const justifyContent: AppViewProps['justifyContent'] = hasAnyAccessory
    ? 'space-between'
    : 'center';

  return (
    <AppRow
      justifyContent={justifyContent}
      alignItems={'center'}>
      {hasAnyAccessory && (
        <AppHeaderAccessoryContainer
          alignItems={'flex-start'}
          onPress={onAccessoryLeftPress}>
          {accessoryLeftIconName && (
            <AppIcon
              name={accessoryLeftIconName}
              colorStatus={accessoryLeftIconColorStatus}
            />
          )}
        </AppHeaderAccessoryContainer>
      )}
      {titleElement}
      {hasAnyAccessory && (
        <AppHeaderAccessoryContainer
          alignItems={'flex-end'}
          onPress={onAccessoryRightPress}>
          {accessoryRightIconName && (
            <AppIcon
              name={accessoryRightIconName}
              colorStatus={accessoryRightIconColorStatus}
            />
          )}
        </AppHeaderAccessoryContainer>
      )}
    </AppRow>
  );
};
