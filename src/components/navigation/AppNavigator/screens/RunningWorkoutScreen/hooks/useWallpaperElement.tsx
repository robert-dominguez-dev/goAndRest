import { characterToWallpaperName } from '../constants.ts';
import { AppImage } from '../../../../../common/AppImage.tsx';
import { useAtomValue } from 'jotai';
import {
  characterVariantSettingAtom,
  soundFeedbackSettingAtom,
} from '../../../../../../contexts/atoms.ts';
import { AppIllustrationName } from '../../../../../../assets/constants/common.ts';

export const useWallpaperElement = () => {
  const soundFeedback = useAtomValue(soundFeedbackSettingAtom);
  const characterVariant = useAtomValue(characterVariantSettingAtom);

  const illustrationName: AppIllustrationName =
    soundFeedback === 'character' && characterVariant
      ? characterToWallpaperName[characterVariant]
      : 'wallpaperDumbbell';

  return <AppImage illustrationName={illustrationName} />;
};
