import { AppView } from '../AppView/AppView.tsx';
import { AppText } from '../AppText/AppText.tsx';
import { AppRow } from '../AppRow.tsx';
import {
  AppButton,
  AppButtonProps,
} from '../../controls/AppButton/AppButton.tsx';
import {
  FILL_CONTAINER_DIMENSION,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../../constants/common.ts';
import { AppBackdrop } from '../AppBackdrop.tsx';

type AppPopUpButtonProps = Pick<AppButtonProps, 'label' | 'onPress'> &
  Pick<AppButtonProps, 'backgroundColorStatus'>;

export type AppPopUpProps = {
  title: string;
  description: string;
  primaryButtonProps: AppPopUpButtonProps;
  secondaryButtonProps?: AppPopUpButtonProps;
  onClose: () => void;
};

export const AppPopUp = ({
  title,
  description,
  primaryButtonProps,
  secondaryButtonProps,
  onClose,
}: AppPopUpProps) => {
  const handleSecondaryButtonPress = () => {
    secondaryButtonProps?.onPress?.();
    onClose();
  };

  const maybeSecondaryButton = secondaryButtonProps ? (
    <AppView
      width={FILL_CONTAINER_DIMENSION}
      shrink>
      <AppButton
        {...secondaryButtonProps}
        onPress={handleSecondaryButtonPress}
      />
    </AppView>
  ) : undefined;

  const handlePrimaryButtonPress = () => {
    primaryButtonProps.onPress?.();
    onClose();
  };

  return (
    <AppBackdrop>
      <AppView
        width={FILL_CONTAINER_DIMENSION}
        gap={'m'}
        padding={'m'}
        margin={'m'}
        borderRadius={'s'}
        backgroundColorStatus={'backgroundAlt'}
        borderColorStatus={'background'}>
        <AppText
          category={'header'}
          textAlign={'center'}>
          {title}
        </AppText>
        <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {description}
        </AppText>
        <AppRow
          gap={'m'}
          paddingTop={'m'}>
          {maybeSecondaryButton}
          <AppView
            width={FILL_CONTAINER_DIMENSION}
            shrink>
            <AppButton
              {...primaryButtonProps}
              onPress={handlePrimaryButtonPress}
            />
          </AppView>
        </AppRow>
      </AppView>
    </AppBackdrop>
  );
};
