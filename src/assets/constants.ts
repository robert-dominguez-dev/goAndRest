import { ImageURISource } from 'react-native';

export enum AppIllustration {
  bible = 'bible',
  earth = 'earth',
  hourglass = 'hourglass',
  roboticArm = 'roboticArm',
  universe = 'universe',
  pieceOfSilver = 'pieceOfSilver',
}

export const appIllustrations: Record<AppIllustration, ImageURISource> = {
  [AppIllustration.bible]: require('./images/questions/bible.png'),
  [AppIllustration.earth]: require('./images/questions/earth.png'),
  [AppIllustration.hourglass]: require('./images/questions/hourglass.png'),
  [AppIllustration.roboticArm]: require('./images/questions/robotic_arm.png'),
  [AppIllustration.universe]: require('./images/questions/universe.png'),
  [AppIllustration.pieceOfSilver]: require('./images/piece_of_silver.png'),
};

export enum AppAnimation {
  thinkingOwl = 'thinking_owl',
  loader = 'loader',
  confetti = 'confetti',
}
