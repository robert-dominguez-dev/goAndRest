import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutCharacterVariant } from '../constants.tsx';
import { Bot, LucideIcon, Swords, WandSparkles } from 'lucide-react-native';
import { SettingValueProps } from '../types.ts';

const characterVariantToEmoji: Record<WorkoutCharacterVariant, LucideIcon> = {
  [WorkoutCharacterVariant.warrior]: Swords,
  [WorkoutCharacterVariant.cyborg]: Bot,
  [WorkoutCharacterVariant.wizard]: WandSparkles,
};

export const getCharacterVariantSettingValueProps = (
  characterVariant: WorkoutCharacterVariant,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.characterVariant.items',
    characterVariant,
  );

  const IconComponent = characterVariantToEmoji[characterVariant];

  return { labelTranslateKey, IconComponent };
};
