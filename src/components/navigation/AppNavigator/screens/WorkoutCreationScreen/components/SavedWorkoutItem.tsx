import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { sizes } from '../../../../../../constants/ui.ts';
import { SavedWorkoutItemHeader } from './SavedWorkoutItemHeader.tsx';
import { AppDivider } from '../../../../../common/AppDivider.tsx';
import { SavedWorkoutItemBody } from './SavedWorkoutItemBody.tsx';
import { memo } from 'react';
import {
  SavedWorkoutItemFooter,
  SavedWorkoutItemFooterProps,
} from './SavedWorkoutItemFooter.tsx';

const SavedWorkoutItemComponent = ({
  workout,
  onStart,
  onDelete,
}: SavedWorkoutItemFooterProps) => {
  return (
    <AppView
      overflow={'hidden'}
      backgroundColorStatus={'backgroundAlt'}
      borderColorStatus={'border'}
      borderWidthOverride={1}
      borderRadius={sizes.configButtonBorderRadius}>
      <SavedWorkoutItemHeader workout={workout} />
      <AppDivider />
      <SavedWorkoutItemBody config={workout.config} />
      <AppDivider />
      <SavedWorkoutItemFooter
        workout={workout}
        onStart={onStart}
        onDelete={onDelete}
      />
    </AppView>
  );
};

export const SavedWorkoutItem = memo(SavedWorkoutItemComponent);
