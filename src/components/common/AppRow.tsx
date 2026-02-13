import { AppView, AppViewProps } from './AppView/AppView.tsx';

type AppRowProps = Omit<AppViewProps, 'flexDirection'>;

export const AppRow = ({ children, ...props }: AppRowProps) => {
  return (
    <AppView
      {...props}
      flexDirection={'row'}>
      {children}
    </AppView>
  );
};
