import { AppView } from '../../../common/AppView.tsx';
import { sizes } from '../../../../constants/ui.ts';

const { radioButtonInnerCircleRadius, radioButtonOuterCircleRadius } = sizes;

const INNER_CIRCLE_BORDER_RADIUS = radioButtonInnerCircleRadius / 2;
const OUTER_CIRCLE_BORDER_RADIUS = radioButtonOuterCircleRadius / 2;

type AppRadioButtonCircleProps = {
  isSelected: boolean | undefined;
};

export const AppRadioButtonCircle = ({
  isSelected,
}: AppRadioButtonCircleProps) => {
  const maybeInnerCircle = isSelected ? (
    <AppView
      width={radioButtonInnerCircleRadius}
      height={radioButtonInnerCircleRadius}
      borderRadius={INNER_CIRCLE_BORDER_RADIUS}
      backgroundColorStatus={'primary'}
    />
  ) : undefined;

  return (
    <AppView
      width={radioButtonOuterCircleRadius}
      height={radioButtonOuterCircleRadius}
      borderRadius={OUTER_CIRCLE_BORDER_RADIUS}
      margin={'xxs'}
      borderColorStatus={'primary'}
      alignItems={'center'}
      justifyContent={'center'}>
      {maybeInnerCircle}
    </AppView>
  );
};
