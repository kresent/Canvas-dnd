import {inject, injectable} from 'inversify';

import {ILoggerService, IScene} from '../interfaces';
import SERVICE_IDENTIFIER from '../constants';

@injectable()
export class ImageScene implements IScene {
  public constructor(@inject(SERVICE_IDENTIFIER.LOGGER) public logger: ILoggerService) {
    this.logger = logger;
  }

  public start(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    context.fillStyle = '#77fde0';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}
