type CalculateStickyShiftInSecondsParams = {
  secondsToSkip: number;
  phaseRemainingSeconds: number;
  phaseElapsedSeconds: number;
};

/**
 * Calculates how many seconds to shift with a "sticky" behavior at phase boundaries.
 * If not at a boundary, it snaps to the boundary.
 * If already at a boundary, it allows skipping across it.
 */
export const calculateStickyShiftInSeconds = ({
  secondsToSkip,
  phaseRemainingSeconds,
  phaseElapsedSeconds,
}: CalculateStickyShiftInSecondsParams): number => {
  const isSkippingForward = secondsToSkip > 0;

  if (isSkippingForward) {
    return phaseRemainingSeconds === 0
      ? secondsToSkip
      : Math.min(secondsToSkip, phaseRemainingSeconds);
  }

  return phaseElapsedSeconds === 0
    ? secondsToSkip
    : Math.max(secondsToSkip, -phaseElapsedSeconds);
};
