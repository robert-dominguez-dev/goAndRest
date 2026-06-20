import { WorkoutCharacterVariant } from '../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';

export type PremiumCharacterActivations = Partial<
  Record<WorkoutCharacterVariant, number>
>;
