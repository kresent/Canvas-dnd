import {injectable} from 'inversify';

import {ILoggerService} from '../interfaces';

@injectable()
export class LoggerService implements ILoggerService {
  log(error: string) {
    console.log(`--->  ${error}`);
  }
}
