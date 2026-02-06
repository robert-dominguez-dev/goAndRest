import { IS_DEV_MODE } from '../../../../constants/common.ts';
import { UserRole } from '../../../../shared/types.ts';
import { useUserAccessContext } from '../../../../context/userAccessContext/userAccessContext.tsx';

export const useDevScreenEasterEggEnabled = () => {
  const { userRole } = useUserAccessContext();
  return IS_DEV_MODE || userRole === UserRole.ADMIN;
};
