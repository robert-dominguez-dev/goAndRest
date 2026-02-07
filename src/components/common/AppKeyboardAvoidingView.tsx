import { useAppSafeAreaPadding } from '../../hooks/useAppSafeAreaPadding.ts';
import { KeyboardAvoidingView } from 'react-native';
import { ChildrenProp } from '../../types/common.ts';

export const AppKeyboardAvoidingView = ({ children }: ChildrenProp) => {
  const { safeAreaPaddingTop } = useAppSafeAreaPadding();

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{ paddingTop: safeAreaPaddingTop }}>
      {children}
    </KeyboardAvoidingView>
  );
};
