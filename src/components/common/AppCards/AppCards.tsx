import { AppRow } from '../AppRow.tsx';
import { useAppCardSize, UseAppCardSizeProps } from './hooks/useAppCardSize.ts';
import { AppCard, AppCardComponentProps, AppCardProps, } from './components/AppCard.tsx';
import { ScrollView } from 'react-native';
import { AppSpacer } from '../AppSpacer.tsx';
import { Fragment } from 'react';

export type AppCardsProps<TValue> = UseAppCardSizeProps & {
  cards: AppCardProps<TValue>[];
  onCardPress?: AppCardComponentProps<TValue>['onPress'];
  selectedCardValue?: AppCardComponentProps<TValue>['selectedValue'];
  shouldUseScrollView?: boolean;
};

export const AppCards = <TValue,>({
  cards,
  gap,
  onCardPress,
  selectedCardValue,
  numberOfCardsPerRow,
  shouldUseScrollView,
}: AppCardsProps<TValue>) => {
  const { handleLayout, cardWidth } = useAppCardSize({
    gap,
    numberOfCardsPerRow,
  });

  const cardElements = cards.map(card => {
    const maybeSpacer = shouldUseScrollView ? (
      <AppSpacer
        isVertical
        size={gap}
      />
    ) : undefined;

    return (
      <Fragment key={card.title}>
        <AppCard
          {...card}
          onPress={onCardPress}
          selectedValue={selectedCardValue}
          width={cardWidth}
        />
        {maybeSpacer}
      </Fragment>
    );
  });

  const contentElement = shouldUseScrollView ? (
    <ScrollView horizontal>{cardElements}</ScrollView>
  ) : (
    cardElements
  );

  return (
    <AppRow
      onLayout={handleLayout}
      gap={gap}
      justifyContent={'flex-start'}
      flexWrap={'wrap'}>
      {contentElement}
    </AppRow>
  );
};
