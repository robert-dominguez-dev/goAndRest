import { Trash } from 'lucide-react-native';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { AppSize } from '../../../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { useAppPopUp } from '../../../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';

type DeleteExistingWorkoutButtonProps = {
  onRemove: () => void;
};

export const RemoveExistingWorkoutButton = ({
  onRemove,
}: DeleteExistingWorkoutButtonProps) => {
  const { text } = useAppThemedColors();

  const { popUpElement, onOpen } = useAppPopUp({
    title: 'Smazat?',
    description: 'Opravdu jdeme mazat?',
    primaryButtonProps: {
      label: 'Smazat',
      onPress: onRemove,
      backgroundColorStatus: 'negative',
    },
    secondaryButtonProps: {
      label: 'Zrušit',
      backgroundColorStatus: 'backgroundAlt',
    },
  });

  return (
    <>
      <AppRoundedButton
        onPress={onOpen}
        size={'s'}
        status={'negative'}>
        <Trash
          size={AppSize.ml}
          color={text}
        />
      </AppRoundedButton>
      {popUpElement}
    </>
  );
};
