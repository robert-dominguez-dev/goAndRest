import { Pressable, PressableProps } from 'react-native';
import { AppText } from './AppText/AppText.tsx';
import { AppRow } from './AppRow.tsx';
import { AppColorUnion, AppSize } from '../../types/ui.ts';
import { AppLoader } from './AppLoader.tsx';
import {
  GROW_SHRINK_STYLE,
  SPACE_ON_ANDROID_TO_PREVENT_TEXT_CUT,
} from '../../constants/ui.ts';
import { getOnPressWithHapticFeedback } from '../controls/helpers/getOnPressWithHapticFeedback.ts';

export type AppLinkProps = Pick<PressableProps, 'onPress' | 'disabled'> & {
  label: string;
  isPending?: boolean;
  status?: Extract<AppColorUnion, 'white' | 'negative'>;
};

export const AppLink = ({
  label,
  isPending,
  onPress,
  disabled,
  status = 'white',
}: AppLinkProps) => (
  <Pressable
    onPress={getOnPressWithHapticFeedback(onPress)}
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
        {SPACE_ON_ANDROID_TO_PREVENT_TEXT_CUT}
      </AppText>
      <AppLoader isPending={isPending} />
    </AppRow>
  </Pressable>
);
