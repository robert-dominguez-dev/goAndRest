import { useLayout } from '../../../../hooks/useLayout.ts';
import { getDefaultCardsContainerWidth } from '../helpers/getDefaultCardsContainerWidth.ts';
import { getAppSize } from '../../../../helpers/getAppSize.ts';
import { AppSizeUnion } from '../../../../types/ui.ts';

export type UseAppCardSizeProps = {
  numberOfCardsPerRow: number;
  gap: AppSizeUnion;
};

export const useAppCardSize = ({
  numberOfCardsPerRow,
  gap,
}: UseAppCardSizeProps) => {
  const defaultCardsContainerWidth = getDefaultCardsContainerWidth();

  const { handleLayout, layout } = useLayout();

  const cardsContainerWidth = layout?.width || defaultCardsContainerWidth;

  const gapWidth = getAppSize(gap) ?? 0;
  const numberOfGaps = numberOfCardsPerRow - 1;
  const totalGapsWidth = gapWidth * numberOfGaps;

  const totalCardsWidth = cardsContainerWidth - totalGapsWidth;
  const cardWidth = Math.floor(totalCardsWidth / numberOfCardsPerRow);

  return { handleLayout, cardWidth };
};
