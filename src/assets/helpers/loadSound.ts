import Sound from 'react-native-sound';

export const loadSound = (fileName: string) =>
  new Sound(fileName, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.error('Failed to load sound', error);
    }
  });
