import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppDivider } from '../../../../../common/AppDivider.tsx';
import {
  AppIconAndLabel,
  AppIconAndLabelProps,
} from '../../../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { JSX } from 'react';

type SettingsSectionProps = Pick<
  AppIconAndLabelProps,
  'label' | 'iconName'
> & {
  items: JSX.Element[];
};

export const SettingsSection = ({
  label,
  iconName,
  items,
}: SettingsSectionProps) => (
  <AppView gap={'m'}>
    <AppRow gap={'m'}>
      <AppRow
        gap={'s'}
        alignItems={'center'}>
        <AppIconAndLabel
          iconName={iconName}
          label={label.toUpperCase()}
          category={'subHeader'}
          textColorStatus={'textMuted'}
          grow={false}
        />
      </AppRow>
      <AppView
        grow
        justifyContent={'center'}>
        <AppDivider />
      </AppView>
    </AppRow>
    <AppView gap={'m'}>{items}</AppView>
  </AppView>
);
