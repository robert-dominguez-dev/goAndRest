import { RunningWorkoutContentParams, RunningWorkoutPhase } from './types.ts';
import { AppColorUnion, AppSizeUnion } from '../../../../../types/ui.ts';
import { Easing, WithTimingConfig } from 'react-native-reanimated';
import { TranslateKey } from '../../../../../locales/types.ts';
import { workoutSettingsButtonConfigMap } from '../LandingScreen/constants.ts';
import {
  Flame,
  LucideIcon,
  Maximize2,
  Minimize2,
  Wind,
} from 'lucide-react-native';
import { AppWallpaper } from '../../../../../assets/types.ts';
import { WorkoutCharacterVariant } from '../SettingsScreen/constants.tsx';
import { ComponentType, JSX } from 'react';
import { RunningWorkoutPortraitContent } from './RunningWorkoutPortraitContent.tsx';
import { RunningWorkoutLandscapeContent } from './RunningWorkoutLandscapeContent.tsx';
import { RunningWorkoutPortraitFooter } from './components/RunningWorkoutPortraitFooter.tsx';
import { AppOrientation } from '../../../../../types/common.ts';

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

export const appOrientationToChangeIcon: Record<AppOrientation, LucideIcon> = {
  PORTRAIT: Maximize2,
  LANDSCAPE: Minimize2,
};

export const appOrientationToRunningWorkoutContentComponent: Record<
  AppOrientation,
  ComponentType<RunningWorkoutContentParams>
> = {
  PORTRAIT: RunningWorkoutPortraitContent,
  LANDSCAPE: RunningWorkoutLandscapeContent,
};

export const appOrientationToRunningWorkoutFooterElement: Record<
  AppOrientation,
  JSX.Element | undefined
> = {
  PORTRAIT: <RunningWorkoutPortraitFooter />,
  LANDSCAPE: undefined,
};

export const appOrientationToRunningWorkoutPaddingTop: Record<
  AppOrientation,
  AppSizeUnion | undefined
> = {
  PORTRAIT: undefined,
  LANDSCAPE: 0,
};
