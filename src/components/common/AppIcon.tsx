import * as Icons from 'lucide-react-native';
import { LucideIcon } from 'lucide-react-native';
import { AppColorUnion, AppSizeUnion } from '../../types/ui.ts';
import { useAppThemedColors } from '../../hooks/useAppThemedColors.ts';
import { getAppSize } from '../../helpers/getAppSize.ts';
import { getNumber } from '../../helpers/getNumber.ts';
import { useGetTabletScaledNumber } from '../../hooks/useGetTabletScaledNumber.ts';

export type AppIconName = Extract<
  keyof typeof Icons,
  | 'ArrowBigRightDash'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'BatteryCharging'
  | 'Bell'
  | 'BellOff'
  | 'Check'
  | 'ChevronRight'
  | 'CircleX'
  | 'Clock'
  | 'Clock9'
  | 'Clock10'
  | 'Clock11'
  | 'Coffee'
  | 'Database'
  | 'Download'
  | 'Drama'
  | 'Drum'
  | 'Dumbbell'
  | 'Flame'
  | 'Gem'
  | 'HandFist'
  | 'History'
  | 'Info'
  | 'LineChart'
  | 'Lock'
  | 'Maximize2'
  | 'Menu'
  | 'Minimize2'
  | 'Music4'
  | 'Palette'
  | 'Pause'
  | 'Play'
  | 'PlayCircle'
  | 'Radio'
  | 'Redo2'
  | 'Repeat'
  | 'RotateCcw'
  | 'Save'
  | 'SaveAll'
  | 'Settings'
  | 'Shell'
  | 'SlidersHorizontal'
  | 'Speech'
  | 'StopCircle'
  | 'Timer'
  | 'Trash2'
  | 'TrendingUp'
  | 'TriangleAlert'
  | 'Undo2'
  | 'Upload'
  | 'Volume2'
  | 'VolumeOff'
  | 'Wind'
  | 'Star'
  | 'X'
>;

type AppIconProps = {
  name: AppIconName;
  size?: AppSizeUnion;
  colorStatus?: AppColorUnion;
};

export const AppIcon = ({
  name,
  size = 'ml',
  colorStatus = 'text',
}: AppIconProps) => {
  const appColors = useAppThemedColors();

  const color = appColors[colorStatus];

  const getTabletScaledNumber = useGetTabletScaledNumber();

  const sizeSafe = getNumber(getAppSize(size));

  const sizeEvaluated = getTabletScaledNumber(sizeSafe);

  const IconComponent: LucideIcon = Icons[name];

  return (
    <IconComponent
      color={color}
      size={sizeEvaluated}
    />
  );
};
