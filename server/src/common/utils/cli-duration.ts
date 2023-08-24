import { clc } from '@nestjs/common/utils/cli-colors.util';

/**
 *
 * @param startTime
 * @param text
 */
export const cliDuration = (startTime: number, text: string) =>
  `${text} ${clc.yellow(`+${String(Date.now() - startTime)}ms`)}`;
