import { useIsVisible } from '../../../common/AppBottomSheet/hooks/useIsVisible.ts';
import { AppImage } from '../../../common/AppImage.tsx';
import { Pressable } from 'react-native';
import { AppViewWithGradientBorderForInput } from '../../AppViewWithGradientBorderForInput.tsx';
import { AppView } from '../../../common/AppView.tsx';
import { sizes } from '../../../../constants/ui.ts';
import { AppFormRenderProps } from '../../types.ts';
import { AppPickerSpecificProps } from '../types.ts';
import { FieldValues } from 'react-hook-form';
import { PrimitiveValue } from '../../../../types/common.ts';
import { JSX, useMemo } from 'react';
import { AppColorUnion } from '../../../../types/ui.ts';
import { getOnPressWithHapticFeedback } from '../../helpers/getOnPressWithHapticFeedback.ts';

const DEFAULT_PICKER_ITEM_COLOR_STATUS: AppColorUnion = 'secondaryStrong';

type AppPickerElementsLayout = {
  selectedItem: JSX.Element | undefined;
  itemsStack: JSX.Element[];
};

export const useAppPickerElementsLayout = <
  TFieldValues extends FieldValues,
  TOptionValue extends PrimitiveValue,
>({
  options,
  onChange,
  disabled,
  itemDimensions,
  value: selectedValue,
}: AppFormRenderProps<
  TFieldValues,
  AppPickerSpecificProps<TOptionValue>
>): AppPickerElementsLayout & { isItemsStackVisible: boolean } => {
  const { isVisible, toggleVisibility, handleClose } = useIsVisible();

  const { selectedItem, itemsStack } = useMemo(
    () =>
      options.reduce<AppPickerElementsLayout>(
        (
          elementsLayout,
          {
            value,
            illustrationName,
            backgroundColorStatus = DEFAULT_PICKER_ITEM_COLOR_STATUS,
          },
        ) => {
          const handleSelect = () => {
            onChange(value);
            handleClose();
          };

          const maybeIllustration = illustrationName ? (
            <AppImage
              {...itemDimensions}
              borderRadius={sizes.innerPickerItemBorderRadius}
              illustrationName={illustrationName}
            />
          ) : undefined;

          const isSelected = value === selectedValue;

          const key = String(value);

          if (isSelected) {
            elementsLayout.selectedItem = (
              <Pressable
                key={key}
                onPress={getOnPressWithHapticFeedback(toggleVisibility)}
                disabled={disabled}>
                <AppViewWithGradientBorderForInput
                  {...itemDimensions}
                  backgroundColorStatus={backgroundColorStatus}>
                  {maybeIllustration}
                </AppViewWithGradientBorderForInput>
              </Pressable>
            );
          } else {
            elementsLayout.itemsStack.push(
              <Pressable
                key={key}
                onPress={getOnPressWithHapticFeedback(handleSelect)}
                disabled={disabled}>
                <AppView
                  borderColorStatus={DEFAULT_PICKER_ITEM_COLOR_STATUS}
                  borderRadius={sizes.outerPickerItemBorderRadius}>
                  <AppView
                    {...itemDimensions}
                    backgroundColorStatus={backgroundColorStatus}
                    borderRadius={sizes.innerPickerItemBorderRadius}>
                    {maybeIllustration}
                  </AppView>
                </AppView>
              </Pressable>,
            );
          }

          return elementsLayout;
        },
        { selectedItem: undefined, itemsStack: [] },
      ),
    [
      handleClose,
      toggleVisibility,
      onChange,
      options,
      itemDimensions,
      selectedValue,
      disabled,
    ],
  );

  return { selectedItem, itemsStack, isItemsStackVisible: isVisible };
};
