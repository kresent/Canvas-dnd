import {inject, injectable} from 'inversify';

import {ILogger, IScene} from '../interfaces';
import SERVICE_IDENTIFIER from '../constants';

@injectable()
export class ImageScene implements IScene {
  public constructor(@inject(SERVICE_IDENTIFIER.LOGGER) public logger: ILogger) {
    this.logger = logger;
  }

  canvasElement?: HTMLCanvasElement;
  canvasContext?: CanvasRenderingContext2D;

  public init(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvasElement = canvas;
    this.canvasContext = context;

    this.fillBackground();
  }

  private fillBackground() {
    // this.canvasContext!.fillStyle = '#77fde0';
    // this.canvasContext!.fillRect(0, 0, this.canvasElement!.width, this.canvasElement!.height);
  }

  public addInteractions() {}
}
