import {inject, injectable} from 'inversify';

import {ILogger, IScene, ISceneController} from '../interfaces';
import SERVICE_IDENTIFIER, {CANVAS_HEIGHT_ASPECT_RATIO} from '../constants';
import IDomInteractor from '../interfaces/domInteractor';
import ISizer from '../interfaces/sizer';

@injectable()
export class SceneController implements ISceneController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) public logger: ILogger,
    @inject(SERVICE_IDENTIFIER.DOMINTERACTOR) public domInteractor: IDomInteractor,
    @inject(SERVICE_IDENTIFIER.SIZER) public sizeService: ISizer,
  ) {
    this.logger = logger;
    this.domInteractor = domInteractor;
  }

  isInitialised = false;
  scene?: IScene;
  canvasElement?: HTMLCanvasElement;
  canvasContext?: CanvasRenderingContext2D;

  public setScene(scene: IScene) {
    this.scene = scene;
  }

  public init(elementId: string) {
    const canvasData = this.domInteractor.getCanvas(elementId);

    if (canvasData) {
      this.canvasElement = canvasData.canvasElement;
      this.canvasContext = canvasData.canvasContext;

      this.isInitialised = true;
      this.setCanvasSize();
      this.domInteractor.addWindowResizeListener(this.setCanvasSize);
    } else {
      this.logger.log('No canvas tag found');
    }
  }

  private setCanvasSize = () => {
    if (!this.canvasElement) {
      this.logger.log('Canvas not found, cannot resize!');
      return;
    }
    const windowSize = this.domInteractor.getWindowSize();

    const {width, height} = this.sizeService.calculateCanvasSize(windowSize);

    this.canvasElement.width = width;
    this.canvasElement.height = height;
  };

  public runScene() {
    if (!this.isInitialised) {
      this.logger.log('Canvas not initialised!');
      return;
    }

    this.scene!.init(this.canvasElement!, this.canvasContext!);
    this.scene!.addInteractions();
  }
}
