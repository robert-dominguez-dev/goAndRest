import { Text, TextProps } from 'react-native';
import { ChildrenProp } from '../../../types/common.ts';
import {
  useAppTextStyle,
  UseAppTextStyleParams,
} from './hooks/useAppTextStyle.ts';

export type AppTextProps = Pick<TextProps, 'numberOfLines'> &
  ChildrenProp &
  UseAppTextStyleParams;

export const AppText = ({
  children,
  numberOfLines = 1,
  ...textStyleProps
}: AppTextProps) => {
  const style = useAppTextStyle(textStyleProps);

  const ellipsizeMode: TextProps['ellipsizeMode'] =
    numberOfLines > 1 ? undefined : 'tail';

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={style}>
      {children}
    </Text>
  );
};
