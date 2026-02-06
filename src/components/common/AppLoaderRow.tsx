import { AppLoader, AppLoaderProps } from './AppLoader.tsx';
import { AppRow } from './AppRow.tsx';

export const AppLoaderRow = (props: Omit<AppLoaderProps, 'isPending'>) => (
  <AppRow
    justifyContent={'center'}
    alignItems={'center'}>
    <AppLoader
      isPending
      {...props}
    />
  </AppRow>
);
