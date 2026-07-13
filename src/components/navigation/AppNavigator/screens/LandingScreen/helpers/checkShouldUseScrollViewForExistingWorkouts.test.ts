import { checkShouldUseScrollViewForExistingWorkouts } from './checkShouldUseScrollViewForExistingWorkouts.ts';

describe('checkShouldUseScrollViewForExistingWorkouts', () => {
  it('returns false when the buttons fit within the screen width', () => {
    expect(
      checkShouldUseScrollViewForExistingWorkouts({
        numberOfButtons: 3,
        buttonSize: 50,
        gapSize: 10,
        allPaddings: 20,
        screenWidth: 400,
      }),
    ).toBe(false);
  });

  it('returns true when the buttons do not fit within the screen width', () => {
    expect(
      checkShouldUseScrollViewForExistingWorkouts({
        numberOfButtons: 5,
        buttonSize: 100,
        gapSize: 10,
        allPaddings: 20,
        screenWidth: 400,
      }),
    ).toBe(true);
  });

  it('returns false when the total size exactly equals the screen width', () => {
    // totalSize = 3*50 + 2*10 + 20 = 190
    expect(
      checkShouldUseScrollViewForExistingWorkouts({
        numberOfButtons: 3,
        buttonSize: 50,
        gapSize: 10,
        allPaddings: 20,
        screenWidth: 190,
      }),
    ).toBe(false);
  });

  it('handles a single button with no gaps', () => {
    // totalSize = 1*50 + 0*10 + 20 = 70
    expect(
      checkShouldUseScrollViewForExistingWorkouts({
        numberOfButtons: 1,
        buttonSize: 50,
        gapSize: 10,
        allPaddings: 20,
        screenWidth: 60,
      }),
    ).toBe(true);

    expect(
      checkShouldUseScrollViewForExistingWorkouts({
        numberOfButtons: 1,
        buttonSize: 50,
        gapSize: 10,
        allPaddings: 20,
        screenWidth: 80,
      }),
    ).toBe(false);
  });
});
