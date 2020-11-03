import {inject, injectable} from 'inversify';

import {ILoggerService, IScene, ISceneInitializer} from '../interfaces';
import SERVICE_IDENTIFIER from '../constants';

@injectable()
export class SceneInitializer implements ISceneInitializer {
  public constructor(@inject(SERVICE_IDENTIFIER.LOGGER) public logger: ILoggerService) {
    this.logger = logger;
  }

  isInitialised = false;
  scene?: IScene;
  canvasElement?: HTMLCanvasElement;
  canvasContext?: CanvasRenderingContext2D;

  public setScene(scene: IScene) {
    this.scene = scene;
  }

  public init(elementId: string) {
    const targetCanvas = document.getElementById(elementId) as HTMLCanvasElement;
    const canvasContext = targetCanvas?.getContext('2d');

    if (canvasContext) {
      this.canvasElement = targetCanvas;
      this.canvasContext = canvasContext;

      this.isInitialised = true;
    } else {
      this.logger.log('No canvas tag found');
    }
  }

  public startScene() {
    if (!this.isInitialised) {
      this.logger.log('Canvas not initialised!');
      return;
    }

    this.scene!.start(this.canvasElement!, this.canvasContext!);
  }
}
