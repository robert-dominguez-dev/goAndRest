import { SettingsItemList, SettingsItemListProps, } from './SettingsItemList.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppDivider } from '../../../../../common/AppDivider.tsx';
import {
  AppIconAndLabel,
  AppIconAndLabelProps,
} from '../../../../../controls/AppButton/components/AppIconAndLabel.tsx';

type SettingsSectionProps = SettingsItemListProps &
  Pick<AppIconAndLabelProps, 'label' | 'IconComponent'>;

export const SettingsSection = ({
  label,
  items,
  IconComponent,
}: SettingsSectionProps) => (
  <AppView gap={'ml'}>
    <AppRow gap={'m'}>
      <AppRow
        gap={'s'}
        alignItems={'center'}>
        <AppIconAndLabel
          IconComponent={IconComponent}
          label={label}
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
    <SettingsItemList items={items} />
  </AppView>
);
