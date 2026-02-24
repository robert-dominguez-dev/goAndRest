import { composeAddTracks } from './composeAddTracks';
import { Countdown, WorkoutSoundFilePaths } from '../../../assets/types.ts';
import { AddTrack } from 'react-native-track-player';
import { RunningWorkoutPhase } from '../../../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';

type TestCase = {
  description: string;
  input: Partial<WorkoutSoundFilePaths>;
  expectedOutput: AddTrack[];
};

const testCases: TestCase[] = [
  {
    description: 'complex dataset with phases, countdown and extras',
    input: {
      [Countdown.Ten]: 'sounds/10.mp3',
      [Countdown.Three]: 'sounds/3.mp3',
      [RunningWorkoutPhase.WARMUP]: ['sounds/warmup.mp3'],
      [RunningWorkoutPhase.WORK]: ['sounds/work.mp3'],
      [RunningWorkoutPhase.REST]: ['sounds/rest.mp3'],
      [RunningWorkoutPhase.RECOVERY]: ['sounds/recovery.mp3'],
      [RunningWorkoutPhase.COOLDOWN]: ['sounds/cooldown.mp3'],
      half: ['sounds/half.mp3'],
      finish: ['sounds/finish.mp3'],
    },
    expectedOutput: [
      {
        url: 'sounds/10.mp3',
        id: String(Countdown.Ten),
        title: String(Countdown.Ten),
        artist: 'Go&Rest',
      },
      {
        url: 'sounds/3.mp3',
        id: String(Countdown.Three),
        title: String(Countdown.Three),
        artist: 'Go&Rest',
      },
      {
        url: 'sounds/warmup.mp3',
        id: RunningWorkoutPhase.WARMUP,
        title: RunningWorkoutPhase.WARMUP,
        artist: 'Go&Rest',
      },
      {
        url: 'sounds/work.mp3',
        id: RunningWorkoutPhase.WORK,
        title: RunningWorkoutPhase.WORK,
        artist: 'Go&Rest',
      },
      {
        url: 'sounds/rest.mp3',
        id: RunningWorkoutPhase.REST,
        title: RunningWorkoutPhase.REST,
        artist: 'Go&Rest',
      },
      {
        url: 'sounds/recovery.mp3',
        id: RunningWorkoutPhase.RECOVERY,
        title: RunningWorkoutPhase.RECOVERY,
        artist: 'Go&Rest',
      },
      {
        url: 'sounds/cooldown.mp3',
        id: RunningWorkoutPhase.COOLDOWN,
        title: RunningWorkoutPhase.COOLDOWN,
        artist: 'Go&Rest',
      },
      { url: 'sounds/half.mp3', id: 'half', title: 'half', artist: 'Go&Rest' },
      {
        url: 'sounds/finish.mp3',
        id: 'finish',
        title: 'finish',
        artist: 'Go&Rest',
      },
    ],
  },
];

describe('composeAddTracks', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    const result = composeAddTracks(input as WorkoutSoundFilePaths);
    expect(result).toEqual(expect.arrayContaining(expectedOutput));
    expect(result).toHaveLength(expectedOutput.length);
  });
});
