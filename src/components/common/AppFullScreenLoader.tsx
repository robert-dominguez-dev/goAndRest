import { AppScreenLayout, AppScreenLayoutProps } from './AppScreenLayout.tsx';
import { AppLoader } from './AppLoader.tsx';
import { AppView } from './AppView.tsx';
import { AppIllustration } from '../../assets/constants.ts';

type AppFullScreenLoaderProps = Pick<
  AppScreenLayoutProps,
  'headerTitle' | 'backgroundIllustration'
>;

export const AppFullScreenLoader = ({
  headerTitle,
  backgroundIllustration = AppIllustration.shepherdsAroundFire,
}: AppFullScreenLoaderProps) => {
  return (
    <AppScreenLayout
      headerTitle={headerTitle}
      backgroundIllustration={backgroundIllustration}>
      <AppView
        grow
        alignItems={'center'}
        justifyContent={'center'}
        paddingBottom={'xl'}>
        <AppLoader isPending={true} size={'l'} />
      </AppView>
    </AppScreenLayout>
  );
};
