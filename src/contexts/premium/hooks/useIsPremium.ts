import { useAtomValue } from 'jotai';
import { isPremiumAtom } from '../../atoms.ts';

export const useIsPremium = (): boolean => useAtomValue(isPremiumAtom);
