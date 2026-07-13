import { createContext, useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ChildrenProp } from '../../types/common.ts';
import { AppLoadingOverlay } from '../../components/common/AppLoadingOverlay/AppLoadingOverlay.tsx';

type AppFullScreenLoaderContextProps = {
  showFullScreenLoader: (message: string) => void;
  hideFullScreenLoader: () => void;
};

const AppFullScreenLoaderContext = createContext<
  AppFullScreenLoaderContextProps | undefined
>(undefined);

// Rendered above the navigator so the overlay covers the whole window -
// including the header - and stays vertically centred on the full screen. A
// non-empty `loaderText` shows the loader; an empty string hides it.
export const AppFullScreenLoaderProvider = ({ children }: ChildrenProp) => {
  const [loaderText, setLoaderText] = useState('');

  const showFullScreenLoader = useCallback((message: string) => {
    setLoaderText(message);
  }, []);

  const hideFullScreenLoader = useCallback(() => {
    setLoaderText('');
  }, []);

  return (
    <AppFullScreenLoaderContext.Provider
      value={{ showFullScreenLoader, hideFullScreenLoader }}>
      <View style={styles.root}>
        {children}
        <AppLoadingOverlay
          visible={loaderText.length > 0}
          message={loaderText}
        />
      </View>
    </AppFullScreenLoaderContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export const useAppFullScreenLoader = () => {
  const context = useContext(AppFullScreenLoaderContext);
  if (!context) {
    throw new Error(
      `${useAppFullScreenLoader.name} must be used within a ${AppFullScreenLoaderProvider.name}`,
    );
  }
  return context;
};
