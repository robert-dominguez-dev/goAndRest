import { useAppSafeAreaPadding } from '../../hooks/useAppSafeAreaPadding.ts';
import { KeyboardAvoidingView } from 'react-native';
import { ChildrenProp } from '../../types/common.ts';

export const AppKeyboardAvoidingView = ({ children }: ChildrenProp) => {
  const { paddingTop } = useAppSafeAreaPadding();

  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ paddingTop }}>
      {children}
    </KeyboardAvoidingView>
  );
};
