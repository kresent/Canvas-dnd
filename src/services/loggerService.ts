import {injectable} from 'inversify';

import {ILogger} from '../interfaces';

@injectable()
export class LoggerService implements ILogger {
  log(error: string) {
    console.log(`--->  ${error}`);
  }
}
