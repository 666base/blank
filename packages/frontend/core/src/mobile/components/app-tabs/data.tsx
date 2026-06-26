import { AppTabCreate } from './create';
import { AppTabJournal } from './journal';
import type { Tab } from './type';

export const tabs: Tab[] = [
  {
    key: 'home',
    to: '/home',
    icon: 'home',
  },
  {
    key: 'journal',
    custom: AppTabJournal,
  },
  {
    key: 'new',
    custom: AppTabCreate,
  },
];
