import { AppView } from '../AppView.tsx';
import { AppText } from '../AppText/AppText.tsx';
import { AppRow } from '../AppRow.tsx';
import { AppButton } from '../../controls/AppButton/AppButton.tsx';
import {
  FILL_CONTAINER_DIMENSION,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../../constants/common.ts';
import { AppBackdrop } from '../AppBackdrop.tsx';
import { AppButtonUIProps } from '../../controls/AppButton/components/AppButtonUI.tsx';
import { AppLink } from '../AppLink.tsx';

export type AppPopUpTextProps = {
  popUpTitle: string;
  popUpContent: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
};

export type AppPopUpProps = AppPopUpTextProps & {
  onPrimaryButtonPress: () => void;
  onSecondaryButtonPress?: () => void;
  secondaryButtonColorStatus?: AppButtonUIProps['status'];
};

export const AppPopUp = ({
  popUpTitle,
  popUpContent,
  onPrimaryButtonPress,
  onSecondaryButtonPress,
  primaryButtonLabel,
  secondaryButtonLabel,
  secondaryButtonColorStatus = 'secondary',
}: AppPopUpProps) => {
  const maybeSecondaryButton = secondaryButtonLabel ? (
    <AppView
      width={FILL_CONTAINER_DIMENSION}
      shrink>
      <AppButton
        status={secondaryButtonColorStatus}
        enabledLabel={secondaryButtonLabel}
        onPress={onSecondaryButtonPress}
      />
    </AppView>
  ) : undefined;

  return (
    <AppBackdrop>
      <AppView
        gap={'l'}
        padding={'m'}
        margin={'m'}
        borderRadius={'s'}
        backgroundColorStatus={'secondaryDeep'}
        borderColorStatus={'secondaryStrong'}>
        <AppLink label={popUpTitle} />
        <AppText
          grow
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {popUpContent}
        </AppText>
        <AppRow gap={'m'}>
          {maybeSecondaryButton}
          <AppView
            width={FILL_CONTAINER_DIMENSION}
            shrink>
            <AppButton
              onPress={onPrimaryButtonPress}
              enabledLabel={primaryButtonLabel}
            />
          </AppView>
        </AppRow>
      </AppView>
    </AppBackdrop>
  );
};
