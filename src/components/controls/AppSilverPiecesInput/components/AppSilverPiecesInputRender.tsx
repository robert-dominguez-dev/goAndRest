import { AppFormRenderProps } from '../../types.ts';
import { FieldValues } from 'react-hook-form';
import { AppSilverPiecesInputSpecificProps } from '../types.ts';
import { useLayout } from '../../../../hooks/useLayout.ts';
import { useTouchOffsets } from '../../../../hooks/useTouchOffsets.ts';
import { sizes } from '../../../../constants/ui.ts';
import { AppRow } from '../../../common/AppRow.tsx';
import { useEffect } from 'react';
import { getNumberOfSilverPiecesFromTouchPosition } from '../helpers/getNumberOfSilverPiecesFromTouchPosition.ts';
import { AppSilverPiecesInputIllustrations } from './AppSilverPiecesInputIllustrations.tsx';
import { triggerHapticFeedback } from '../../helpers/triggerHapticFeedback.ts';

export const AppSilverPiecesInputRender = <TFieldValues extends FieldValues>({
  value,
  maxValue,
  onChange,
  disabled,
  minValue = 1,
}: AppFormRenderProps<TFieldValues, AppSilverPiecesInputSpecificProps>) => {
  const { handleTouchEvent, touchOffsets } = useTouchOffsets();
  const { handleLayout, layout } = useLayout();

  useEffect(() => {
    if (disabled) {
      return undefined;
    }

    const numberOfSilverPieces = getNumberOfSilverPiecesFromTouchPosition({
      minValue,
      maxValue,
      layoutWidth: layout?.width,
      touchOffsetX: touchOffsets?.x,
    });

    if (!numberOfSilverPieces) {
      return undefined;
    }

    if (value !== numberOfSilverPieces) {
      triggerHapticFeedback();
    }

    onChange(numberOfSilverPieces);
  }, [
    disabled,
    layout?.width,
    maxValue,
    minValue,
    onChange,
    touchOffsets?.x,
    value,
  ]);

  return (
    <AppRow
      gap={'s'}
      alignSelf={'flex-start'}
      height={sizes.inputHeight}
      onLayout={handleLayout}
      onTouchStart={handleTouchEvent}
      onTouchMove={handleTouchEvent}>
      <AppSilverPiecesInputIllustrations
        value={value}
        maxValue={maxValue}
      />
    </AppRow>
  );
};
