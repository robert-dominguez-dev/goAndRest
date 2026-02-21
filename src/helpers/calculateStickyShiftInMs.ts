import { ONE_SECOND_MS } from '../constants/common.ts';

type CalculateStickyShiftInMsParams = {
  msToSkip: number;
  phaseRemainingMs: number;
  phaseElapsedMs: number;
};

/**
 * Calculates how many ms to shift with a "sticky" behavior at phase boundaries.
 * If not at a boundary, it snaps to the boundary.
 * If already at a boundary, it allows skipping across it.
 */
export const calculateStickyShiftInMs = ({
  msToSkip,
  phaseRemainingMs,
  phaseElapsedMs,
}: CalculateStickyShiftInMsParams): number => {
  const isSkippingForward = msToSkip > 0;

  if (isSkippingForward) {
    return phaseRemainingMs === 0
      ? msToSkip
      : Math.min(msToSkip, phaseRemainingMs);
  }

  return phaseElapsedMs < ONE_SECOND_MS
    ? msToSkip
    : Math.max(msToSkip, -phaseElapsedMs);
};
