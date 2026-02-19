import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { ChildrenProp } from '../../../../../../types/common.ts';

export const SettingsItemValueText = ({ children }: ChildrenProp) => (
  <AppText
    grow={false}
    category={'subHeader'}
    colorStatus={'textMuted'}>
    {children}
  </AppText>
);
