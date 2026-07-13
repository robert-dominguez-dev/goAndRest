import { calculateStickyShiftInMs } from './calculateStickyShiftInMs.ts';
import { ONE_SECOND_MS } from '../constants/common.ts';

describe('calculateStickyShiftInMs', () => {
  describe('skipping forward (msToSkip > 0)', () => {
    it('skips across the boundary when phaseRemainingMs is below one second', () => {
      expect(
        calculateStickyShiftInMs({
          msToSkip: 5000,
          phaseRemainingMs: ONE_SECOND_MS - 1,
          phaseElapsedMs: 0,
        }),
      ).toBe(5000);
    });

    it('snaps to the boundary when phaseRemainingMs is exactly one second', () => {
      expect(
        calculateStickyShiftInMs({
          msToSkip: 5000,
          phaseRemainingMs: ONE_SECOND_MS,
          phaseElapsedMs: 0,
        }),
      ).toBe(ONE_SECOND_MS);
    });

    it('snaps to the boundary when phaseRemainingMs is above one second and smaller than msToSkip', () => {
      expect(
        calculateStickyShiftInMs({
          msToSkip: 5000,
          phaseRemainingMs: 3000,
          phaseElapsedMs: 0,
        }),
      ).toBe(3000);
    });

    it('returns msToSkip when it is smaller than phaseRemainingMs', () => {
      expect(
        calculateStickyShiftInMs({
          msToSkip: 1500,
          phaseRemainingMs: 3000,
          phaseElapsedMs: 0,
        }),
      ).toBe(1500);
    });
  });

  describe('skipping backward (msToSkip < 0)', () => {
    it('skips across the boundary when phaseElapsedMs is below one second', () => {
      expect(
        calculateStickyShiftInMs({
          msToSkip: -5000,
          phaseRemainingMs: 0,
          phaseElapsedMs: ONE_SECOND_MS - 1,
        }),
      ).toBe(-5000);
    });

    it('snaps to the boundary when phaseElapsedMs is exactly one second', () => {
      expect(
        calculateStickyShiftInMs({
          msToSkip: -5000,
          phaseRemainingMs: 0,
          phaseElapsedMs: ONE_SECOND_MS,
        }),
      ).toBe(-ONE_SECOND_MS);
    });

    it('snaps to the boundary when phaseElapsedMs is above one second and smaller than |msToSkip|', () => {
      expect(
        calculateStickyShiftInMs({
          msToSkip: -5000,
          phaseRemainingMs: 0,
          phaseElapsedMs: 3000,
        }),
      ).toBe(-3000);
    });

    it('returns msToSkip when |msToSkip| is smaller than phaseElapsedMs', () => {
      expect(
        calculateStickyShiftInMs({
          msToSkip: -1500,
          phaseRemainingMs: 0,
          phaseElapsedMs: 3000,
        }),
      ).toBe(-1500);
    });
  });
});
