import { Pressable, PressableProps } from 'react-native';
import { AppText } from './AppText/AppText.tsx';
import { AppRow } from './AppRow.tsx';
import { AppColorUnion, AppSize } from '../../types/ui.ts';
import { AppLoader } from './AppLoader.tsx';
import { GROW_SHRINK_STYLE } from '../../constants/ui.ts';
import { getOnPressWithHapticFeedbackConditionally } from '../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';

export type AppLinkProps = Pick<PressableProps, 'onPress' | 'disabled'> & {
  label: string;
  isPending?: boolean;
  status?: Extract<AppColorUnion, 'text' | 'negative'>;
};

export const AppLink = ({
  label,
  isPending,
  onPress,
  disabled,
  status = 'text',
}: AppLinkProps) => (
  <Pressable
    onPress={getOnPressWithHapticFeedbackConditionally(onPress)}
    disabled={disabled}
    style={GROW_SHRINK_STYLE}>
    <AppRow
      gap={AppSize.s}
      alignItems={'center'}
      justifyContent={'center'}>
      <AppText
        grow={!isPending}
        colorStatus={status}
        category={'header'}
        textAlign={'center'}>
        {label}
      </AppText>
      <AppLoader isPending={!!isPending} />
    </AppRow>
  </Pressable>
);
