import { TextInputProps } from 'react-native';

export type AppInputSpecificProps = Pick<
  TextInputProps,
  'placeholder' | 'secureTextEntry' | 'editable' | 'multiline'
> & {
  numeric?: boolean;
};
