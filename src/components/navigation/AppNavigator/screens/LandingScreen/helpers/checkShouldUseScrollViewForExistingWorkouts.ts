type CheckShouldUseScrollViewForExistingWorkoutsParams = {
  numberOfButtons: number;
  buttonSize: number;
  gapSize: number;
  allPaddings: number;
  screenWidth: number;
};

export const checkShouldUseScrollViewForExistingWorkouts = ({
  numberOfButtons,
  buttonSize,
  gapSize,
  allPaddings,
  screenWidth,
}: CheckShouldUseScrollViewForExistingWorkoutsParams): boolean => {
  const allButtonsSize = buttonSize * numberOfButtons;

  const numberOfGaps = numberOfButtons - 1;
  const allGapsSize = numberOfGaps * gapSize;

  const totalSize = allButtonsSize + allGapsSize + allPaddings;
  console.log({ totalSize, screenWidth });
  return totalSize > screenWidth;
};
