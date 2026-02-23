import { useEffect } from 'react';
import { appIllustrations } from '../assets/constants.ts';
import { Image } from 'react-native';

export const usePreloadImagesOnMount = () =>
  useEffect(() => {
    Object.values(appIllustrations).forEach(image => {
      const uri = Image.resolveAssetSource(image).uri;
      void Image.prefetch(uri);
    });
  }, []);
