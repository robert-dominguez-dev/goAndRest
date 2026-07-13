import { AppColorUnion } from '../../types/ui.ts';
import { AppIconName } from './AppIcon.tsx';

export type AppStatus = 'info' | 'alert' | 'error';

type UIStatusProps = {
  iconName: AppIconName;
  text: AppColorUnion;
  background: AppColorUnion;
};

export const appStatusUIMap: Record<AppStatus, UIStatusProps> = {
  info: { iconName: 'Info', text: 'infoHintText', background: 'border' },
  alert: {
    iconName: 'TriangleAlert',
    text: 'alert',
    background: 'alertBackground',
  },
  error: {
    iconName: 'TriangleAlert',
    text: 'error',
    background: 'errorBackground',
  },
};
