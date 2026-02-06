import { AppRow } from '../AppRow.tsx';
import { useAppCardSize, UseAppCardSizeProps } from './hooks/useAppCardSize.ts';
import {
  AppCard,
  AppCardComponentProps,
  AppCardProps,
} from './components/AppCard.tsx';

export type AppCardsProps<TValue> = UseAppCardSizeProps & {
  cards: AppCardProps<TValue>[];
  onCardPress?: AppCardComponentProps<TValue>['onPress'];
  selectedCardValue?: AppCardComponentProps<TValue>['selectedValue'];
};

export const AppCards = <TValue,>({
  cards,
  gap,
  numberOfCardsPerRow,
  onCardPress,
  selectedCardValue,
}: AppCardsProps<TValue>) => {
  const { handleLayout, cardWidth } = useAppCardSize({
    gap,
    numberOfCardsPerRow,
  });

  return (
    <AppRow
      onLayout={handleLayout}
      gap={'s'}
      justifyContent={'flex-start'}
      flexWrap={'wrap'}>
      {cards.map(card => (
        <AppCard
          key={card.title}
          {...card}
          onPress={onCardPress}
          selectedValue={selectedCardValue}
          width={cardWidth}
        />
      ))}
    </AppRow>
  );
};
