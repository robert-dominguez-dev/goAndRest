import { FieldValues } from 'react-hook-form';
import { AppRow } from '../../../common/AppRow.tsx';
import { ScrollView, ViewStyle } from 'react-native';

import { AppFormRenderProps } from '../../types.ts';
import { PrimitiveValue } from '../../../../types/common.ts';
import { AppPickerSpecificProps } from '../types.ts';
import { NON_PRESENT_VIEW_STYLE } from '../../../../constants/ui.ts';
import { useAppPickerElementsLayout } from '../hooks/useAppPickerElementsLayout.tsx';
import { memo } from 'react';
import { AppSizeUnion } from '../../../../types/ui.ts';

const PICKER_ITEMS_GAP: AppSizeUnion = 'xs';

const _AppPickerRender = <
  TFieldValues extends FieldValues,
  TOptionValue extends PrimitiveValue,
>(
  props: AppFormRenderProps<TFieldValues, AppPickerSpecificProps<TOptionValue>>,
) => {
  const { selectedItem, itemsStack, isItemsStackVisible } =
    useAppPickerElementsLayout(props);

  /**
   * Controlling visibility using styles for performance reasons,
   * because the images will remain loaded unlike the case,
   * when we would destroy the element completely by not rendering it.
   */
  const itemsStackStyle: ViewStyle | undefined = !isItemsStackVisible
    ? NON_PRESENT_VIEW_STYLE
    : undefined;

  return (
    <AppRow gap={PICKER_ITEMS_GAP}>
      {selectedItem}
      <ScrollView
        horizontal
        keyboardShouldPersistTaps={'handled'}
        style={itemsStackStyle}>
        <AppRow gap={PICKER_ITEMS_GAP}>{itemsStack}</AppRow>
      </ScrollView>
    </AppRow>
  );
};

export const AppPickerRender = memo(_AppPickerRender);
