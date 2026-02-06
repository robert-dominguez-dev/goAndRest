import {
  AppRadioButton,
  AppRadioButtonComponentProps,
  AppRadioButtonProps,
} from './components/AppRadioButton.tsx';
import { AppView } from '../../common/AppView.tsx';

export type AppRadioButtonsProps<TValue extends string> = Pick<
  AppRadioButtonComponentProps<TValue>,
  'selectedValue' | 'onSelect' | 'disabled'
> & {
  options: AppRadioButtonProps<TValue>[];
};

export const AppRadioButtons = <TValue extends string>({
  options,
  selectedValue,
  onSelect,
  disabled,
}: AppRadioButtonsProps<TValue>) => (
  <AppView gap={'ml'}>
    {options.map(option => (
      <AppRadioButton
        key={option.value}
        selectedValue={selectedValue}
        onSelect={onSelect}
        disabled={disabled}
        {...option}
      />
    ))}
  </AppView>
);
