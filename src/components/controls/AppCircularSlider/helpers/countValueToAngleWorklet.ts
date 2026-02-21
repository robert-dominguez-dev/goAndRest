type CountValueToAngleWorkletParams = {
  value: number;
  maxValue: number;
};

export const countValueToAngleWorklet = ({
  value,
  maxValue,
}: CountValueToAngleWorkletParams): number => {
  'worklet';
  const fullCircle = 2 * Math.PI;
  const percentage = value / maxValue;
  return percentage * fullCircle;
};
