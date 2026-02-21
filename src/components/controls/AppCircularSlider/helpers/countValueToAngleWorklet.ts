type CountValueToAngleWorkletParams = {
  value: number;
  maxValue: number;
};

export const countValueToAngleWorklet = ({
  value,
  maxValue,
}: CountValueToAngleWorkletParams) => {
  'worklet';
  const percentage = value / maxValue;
  return percentage * 2 * Math.PI;
};
