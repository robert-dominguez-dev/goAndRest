import { AppImageProps } from '../../AppImage.tsx';
import { CardColorProps } from '../types.ts';
import { AppView } from '../../AppView.tsx';
import { sizes } from '../../../../constants/ui.ts';
import { AppText } from '../../AppText/AppText.tsx';
import { AppRow } from '../../AppRow.tsx';
import { AppColorUnion, AppSize, AppSizeUnion } from '../../../../types/ui.ts';
import { Pressable } from 'react-native';
import { AppCardImage } from './AppCardImage.tsx';
import { JSX } from 'react';

const CARD_PADDING = AppSize.s;
const CARD_HORIZONTAL_PADDING = CARD_PADDING * 2;

export type AppCardProps<TValue> = Pick<AppImageProps, 'illustrationName'> &
  CardColorProps & {
    selectedBackgroundColorStatus?: AppColorUnion;
    title: string;
    titleColorStatus?: AppColorUnion;
    selectedTitleColorStatus?: AppColorUnion;
    accessoryRight?: JSX.Element;
    value: TValue;
  };

export type AppCardComponentProps<TValue> = AppCardProps<TValue> & {
  width: number;
  selectedValue?: TValue;
  onPress?: (value: TValue) => void;
};

export const AppCard = <TValue,>({
  title,
  titleColorStatus,
  selectedTitleColorStatus,
  illustrationName,
  accessoryRight,
  width,
  backgroundColorStatus,
  selectedBackgroundColorStatus,
  borderColorStatus,
  value,
  selectedValue,
  onPress,
}: AppCardComponentProps<TValue>) => {
  const imageHeight = width - CARD_HORIZONTAL_PADDING;

  const handlePress = onPress && value ? () => onPress(value) : undefined;

  const isSelected = value === selectedValue;

  const backgroundColorStatusEvaluated =
    isSelected && selectedBackgroundColorStatus
      ? selectedBackgroundColorStatus
      : backgroundColorStatus;

  const titleColorStatusEvaluated =
    isSelected && selectedTitleColorStatus
      ? selectedTitleColorStatus
      : titleColorStatus;

  const paddingHorizontal: AppSizeUnion | undefined = accessoryRight
    ? 'xs'
    : undefined;

  return (
    <Pressable onPress={handlePress}>
      <AppView
        grow
        maxWidth={width}
        width={width}
        padding={CARD_PADDING}
        gap={'xs'}
        backgroundColorStatus={backgroundColorStatusEvaluated}
        borderColorStatus={borderColorStatus}
        borderRadius={sizes.cardBorderRadius}>
        <AppRow>
          <AppView
            grow
            shrink
            paddingHorizontal={paddingHorizontal}>
            <AppText
              category={'title'}
              textAlign={'center'}
              colorStatus={titleColorStatusEvaluated}>
              {title}
            </AppText>
          </AppView>
          {accessoryRight}
        </AppRow>
        <AppCardImage
          height={imageHeight}
          colorStatus={borderColorStatus}
          illustrationName={illustrationName}
        />
      </AppView>
    </Pressable>
  );
};
