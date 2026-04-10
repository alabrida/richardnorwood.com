import type { AppProps } from '@/lib/wms/types';

export type OutlookView = 'inbox' | 'compose';

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  body: string;
  read: boolean;
  folder: string;
}

export interface Folder {
  name: string;
  icon: string;
  count: number;
}
