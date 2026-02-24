import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const loadSound = (resource: any) =>
  new Sound(resource, error => {
    if (error) {
      console.error('Failed to load sound', error);
    }
  });
