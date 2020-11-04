import {injectable} from 'inversify';

import ILogger from '../interfaces/logger';

@injectable()
export class LoggerService implements ILogger {
  log(error: string) {
    console.log(`--->  ${error}`);
  }
}
