import { AppText } from '../../AppText/AppText.tsx';
import { ChildrenProp } from '../../../../types/common.ts';

export const AppSelectionBottomSheetItemText = ({ children }: ChildrenProp) => (
  <AppText
    grow={false}
    category={'subHeader'}
    colorStatus={'text'}>
    {children}
  </AppText>
);
