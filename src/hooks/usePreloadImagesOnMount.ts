import { useEffect } from 'react';
import { appIllustrations } from '../assets/constants.ts';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

export const usePreloadImagesOnMount = () =>
  useEffect(() => {
    const imagesToPreload = Object.values(appIllustrations).map(image => ({
      uri: Image.resolveAssetSource(image).uri,
    }));

    FastImage.preload(imagesToPreload);
  }, []);
