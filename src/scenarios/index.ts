/**
 * Central registry of all heuristic scenarios.
 *
 * To add a new scenario:
 *   1. Create a new folder: src/scenarios/hXX-your-name/
 *   2. Add BadScenario.tsx, GoodScenario.tsx, config.ts following existing patterns
 *   3. Import and add the config to the array below
 *
 * The game plays them in array order.
 */

import { h01 } from './h01-system-status/config';
import { h02 } from './h02-real-world/config';
import { h03 } from './h03-user-control/config';
import { h04 } from './h04-consistency/config';
import { h05 } from './h05-error-prevention/config';
import { h06 } from './h06-recognition/config';
import { h07 } from './h07-flexibility/config';
import { h08 } from './h08-aesthetic-design/config';
import { h09 } from './h09-error-recovery/config';
import { h10 } from './h10-help-docs/config';

import type { HeuristicConfig } from '../types/game';

export const heuristics: HeuristicConfig[] = [
  h01,
  h02,
  h03,
  h04,
  h05,
  h06,
  h07,
  h08,
  h09,
  h10,
];
