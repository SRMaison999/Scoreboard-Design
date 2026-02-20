import type { ManualChapter } from '@/types/userManual';
import { ch01 } from './ch01-introduction';
import { ch02 } from './ch02-editeur';
import { ch03 } from './ch03-body-types';
import { ch03b } from './ch03b-layout-libre';
import { ch04 } from './ch04-personnalisation';
import { ch05 } from './ch05-horloge';
import { ch06 } from './ch06-templates';
import { ch07 } from './ch07-operateur';
import { ch08 } from './ch08-sortie';
import { ch09 } from './ch09-capture';
import { ch10 } from './ch10-photos';
import { ch11 } from './ch11-logos';
import { ch12 } from './ch12-animations';
import { ch13 } from './ch13-integrations';

export const MANUAL_CHAPTERS: readonly ManualChapter[] = [
  ch01,
  ch02,
  ch03,
  ch03b,
  ch04,
  ch05,
  ch06,
  ch07,
  ch08,
  ch09,
  ch10,
  ch11,
  ch12,
  ch13,
] as const;
