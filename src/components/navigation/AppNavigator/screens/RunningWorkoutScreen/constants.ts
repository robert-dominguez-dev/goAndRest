import { RunningWorkoutPhase } from './types.ts';
import { AppColorUnion } from '../../../../../types/ui.ts';
import { Easing, WithTimingConfig } from 'react-native-reanimated';
import { TranslateKey } from '../../../../../locales/types.ts';
import { workoutSettingsButtonConfigMap } from '../LandingScreen/constants.ts';
import { Flame, LucideIcon, Wind } from 'lucide-react-native';
import { AppWallpaper } from '../../../../../assets/types.ts';
import { WorkoutCharacterVariant } from '../SettingsScreen/constants.tsx';

export const workoutPhaseToTimerColorStatus: Record<
  RunningWorkoutPhase,
  AppColorUnion
> = {
  [RunningWorkoutPhase.WARMUP]: 'warmupPhase',
  [RunningWorkoutPhase.WORK]: 'workPhase',
  [RunningWorkoutPhase.REST]: 'restPhase',
  [RunningWorkoutPhase.RECOVERY]: 'recoveryPhase',
  [RunningWorkoutPhase.COOLDOWN]: 'cooldownPhase',
};

export const workoutPhaseToNameTranslateKey: Record<
  RunningWorkoutPhase,
  TranslateKey
> = {
  [RunningWorkoutPhase.WARMUP]:
    'screens.settingsScreen.workoutSection.items.warmup.label',
  [RunningWorkoutPhase.WORK]: workoutSettingsButtonConfigMap.work.labelKey,
  [RunningWorkoutPhase.REST]: workoutSettingsButtonConfigMap.rest.labelKey,
  [RunningWorkoutPhase.RECOVERY]:
    workoutSettingsButtonConfigMap.recovery.labelKey,
  [RunningWorkoutPhase.COOLDOWN]:
    'screens.settingsScreen.workoutSection.items.cooldown.label',
};

export const workoutPhaseToIconComponent: Record<
  RunningWorkoutPhase,
  LucideIcon
> = {
  [RunningWorkoutPhase.WARMUP]: Flame,
  [RunningWorkoutPhase.WORK]: workoutSettingsButtonConfigMap.work.IconComponent,
  [RunningWorkoutPhase.REST]: workoutSettingsButtonConfigMap.rest.IconComponent,
  [RunningWorkoutPhase.RECOVERY]:
    workoutSettingsButtonConfigMap.recovery.IconComponent,
  [RunningWorkoutPhase.COOLDOWN]: Wind,
};

export const workoutPhaseToPulsingAnimationConfig: Record<
  RunningWorkoutPhase,
  Pick<WithTimingConfig, 'duration' | 'easing'>
> = {
  [RunningWorkoutPhase.WARMUP]: {
    duration: 1000,
    easing: Easing.inOut(Easing.sin),
  },
  [RunningWorkoutPhase.WORK]: {
    duration: 800,
    easing: Easing.inOut(Easing.quad),
  },
  [RunningWorkoutPhase.REST]: {
    duration: 1200,
    easing: Easing.inOut(Easing.sin),
  },
  [RunningWorkoutPhase.RECOVERY]: {
    duration: 1200,
    easing: Easing.inOut(Easing.sin),
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    duration: 1600,
    easing: Easing.inOut(Easing.sin),
  },
};

export const characterToWallpaperName: Record<
  WorkoutCharacterVariant,
  AppWallpaper
> = {
  [WorkoutCharacterVariant.warrior]: 'wallpaperWarrior',
  [WorkoutCharacterVariant.shieldmaiden]: 'wallpaperWarrior',
  [WorkoutCharacterVariant.cyborg]: 'wallpaperCyborg',
  [WorkoutCharacterVariant.wizard]: 'wallpaperWizard',
};
