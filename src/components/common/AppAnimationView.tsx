import { ViewStyle } from 'react-native';

import { AppAnimation } from '../../assets/constants.ts';
import Rive from 'rive-react-native';
import { useState } from 'react';
import {
  appAnimationToDuration,
  getIsOneShotAnimation,
} from '../../assets/helpers/getIsOneShotAnimation.ts';
import { NON_PRESENT_VIEW_STYLE } from '../../constants/ui.ts';
import { useConditionalTimeout } from '../../hooks/useConditionalTimeout.ts';

export type AppAnimationViewProps = Pick<ViewStyle, 'width' | 'height'> & {
  /**
   * Controls, if the animation should be visible and part of the view,
   * i.e. if false, it's like the component was not even rendered.
   */
  isPresent?: boolean;
  resourceName: AppAnimation;
};

export const AppAnimationView = ({
  resourceName,
  width,
  height,
  isPresent = true,
}: AppAnimationViewProps) => {
  const [isPresentInner, setIsPresentInner] = useState(true);

  const isPresentEvaluated = isPresent && isPresentInner;

  /**
   * The Presence of the animation needs to be solved like this,
   * because when we remove Rive animation from the view completely,
   * it won't appear on the next mount even if it should be present.
   */
  const maybeNonPresentViewStyle: ViewStyle | undefined = isPresentEvaluated
    ? undefined
    : NON_PRESENT_VIEW_STYLE;

  const style: ViewStyle = {
    width,
    height,
    maxWidth: width,
    maxHeight: height,
    overflow: 'hidden',
    ...maybeNonPresentViewStyle,
  };

  const handleDismiss = () => setIsPresentInner(false);

  const dismissAfterMs = getIsOneShotAnimation(resourceName)
    ? appAnimationToDuration[resourceName]
    : undefined;

  const shouldStartDismissTimeout = isPresentEvaluated && !!dismissAfterMs;

  useConditionalTimeout(
    handleDismiss,
    dismissAfterMs,
    shouldStartDismissTimeout,
  );

  return (
    <Rive
      resourceName={resourceName}
      style={style}
    />
  );
};
