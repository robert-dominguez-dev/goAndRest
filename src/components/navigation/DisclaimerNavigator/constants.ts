import { TranslateKey } from '../../../locales/types.ts';

type DisclaimerSection = {
  titleKey: TranslateKey;
  descriptionKey: TranslateKey;
};

export const sectionTranslateKeys: DisclaimerSection[] = [
  {
    titleKey: 'screens.disclaimerScreen.sections.first.title',
    descriptionKey: 'screens.disclaimerScreen.sections.first.description',
  },
  {
    titleKey: 'screens.disclaimerScreen.sections.second.title',
    descriptionKey: 'screens.disclaimerScreen.sections.second.description',
  },
  {
    titleKey: 'screens.disclaimerScreen.sections.third.title',
    descriptionKey: 'screens.disclaimerScreen.sections.third.description',
  },
  {
    titleKey: 'screens.disclaimerScreen.sections.fourth.title',
    descriptionKey: 'screens.disclaimerScreen.sections.fourth.description',
  },
];
