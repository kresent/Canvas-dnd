import {inject, injectable} from 'inversify';

import {ILogger, IScene} from '../interfaces';
import SERVICE_IDENTIFIER, {IMAGE_OVERLAY_SIZE} from '../constants';
import IImageLoader from '../interfaces/imageLoader';

@injectable()
export class ImageScene implements IScene {
  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) public logger: ILogger,
    @inject(SERVICE_IDENTIFIER.IMAGE_LOADER) public imageService: IImageLoader,
  ) {
    this.logger = logger;
  }

  private canvasElement?: HTMLCanvasElement;
  private canvasContext?: CanvasRenderingContext2D;
  private overlayImages: HTMLImageElement[] = [];

  public init(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvasElement = canvas;
    this.canvasContext = context;

    this.renderOverlays();
  }

  private async renderOverlays() {
    const images = await this.loadOverlays();
    this.overlayImages = this.getOverlaysInOrder(images);
    this.drawOverlays();
  }

  private getOverlaysInOrder(images: HTMLImageElement[]) {
    // Perform any reordering in overlay list. First will be drawn below the next
    // e.g. images.reverse() will put last image on top

    return images;
  }

  private async loadOverlays() {
    return await this.imageService.getImages();
  }

  private drawOverlays() {
    this.overlayImages.forEach((image, index) => {
      this.canvasContext!.drawImage(image, index * 50, 0, IMAGE_OVERLAY_SIZE, IMAGE_OVERLAY_SIZE);
    });
  }

  public addInteractions() {}
}
