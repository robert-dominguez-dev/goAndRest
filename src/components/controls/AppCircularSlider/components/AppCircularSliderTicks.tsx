import React, { memo } from 'react';
import { G, Line, Text as SvgText } from 'react-native-svg';

const TICK_LENGTH_MAJOR = 10;
const TICK_LENGTH_MINOR = 6;
const LABEL_OFFSET = 30;
const DISTANCE_FROM_TRACK = 4;

export type AppCircularSliderTicksProps = {
  center: number;
  radius: number;
  strokeWidth: number;
  totalRange: number;
  step: number;
  trackColor: string;
  fontFamily?: string;
  labelEveryNSteps?: number;
  valueFormatter?: (value: number) => string;
};

const _AppCircularSliderTicks = ({
  center,
  radius,
  strokeWidth,
  totalRange,
  step,
  trackColor,
  fontFamily,
  valueFormatter,
  labelEveryNSteps = 1,
}: AppCircularSliderTicksProps) => {
  const elements = [];

  const numberOfSteps = totalRange / step;
  const angleStep = 360 / numberOfSteps;
  const labelInterval = labelEveryNSteps * step;

  /**
   * We iterate using i < numberOfSteps to ensure the 12 o'clock position
   * shows only the minValue (index 0) and not the maxValue (last index).
   */
  for (let i = 0; i < numberOfSteps; i++) {
    const currentVal = i * step;

    /**
     * MAJOR TICK LOGIC:
     * 1. The very first element (i === 0) is ALWAYS major to show minValue.
     * 2. Other elements are major if they are divisible by the labelInterval.
     */
    const isFirst = i === 0;
    const isDivisible = Math.round(currentVal) % labelInterval === 0;
    const isMajor = isFirst || isDivisible;

    const angle = i * angleStep;
    const angleRad = (angle - 90) * (Math.PI / 180);

    const currentTickLength = isMajor ? TICK_LENGTH_MAJOR : TICK_LENGTH_MINOR;

    const x1 =
      center +
      (radius - strokeWidth / 2 - DISTANCE_FROM_TRACK) * Math.cos(angleRad);

    const y1 =
      center +
      (radius - strokeWidth / 2 - DISTANCE_FROM_TRACK) * Math.sin(angleRad);

    const x2 =
      center +
      (radius - strokeWidth / 2 - DISTANCE_FROM_TRACK - currentTickLength) *
        Math.cos(angleRad);

    const y2 =
      center +
      (radius - strokeWidth / 2 - DISTANCE_FROM_TRACK - currentTickLength) *
        Math.sin(angleRad);

    elements.push(
      <Line
        key={`tick-${i}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={trackColor}
        strokeWidth={isMajor ? 2 : 1}
        strokeLinecap="round"
      />,
    );

    if (isMajor) {
      const tx =
        center + (radius - strokeWidth / 2 - LABEL_OFFSET) * Math.cos(angleRad);
      const ty =
        center + (radius - strokeWidth / 2 - LABEL_OFFSET) * Math.sin(angleRad);

      const roundedValue = Math.round(currentVal);

      const formattedLabel = valueFormatter
        ? valueFormatter(roundedValue)
        : roundedValue;

      elements.push(
        <SvgText
          key={`text-${i}`}
          x={tx}
          y={ty + 1}
          fill={trackColor}
          fontSize={10}
          fontWeight={700}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontFamily={fontFamily}>
          {formattedLabel}
        </SvgText>,
      );
    }
  }

  return <G>{elements}</G>;
};

export const AppCircularSliderTicks = memo(_AppCircularSliderTicks);
