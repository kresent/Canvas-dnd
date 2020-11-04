import {inject, injectable} from 'inversify';

import {ILogger, IScene} from '../interfaces';
import SERVICE_IDENTIFIER, {IMAGE_OVERLAY_SIZE} from '../constants';
import IImageLoader from '../interfaces/imageLoader';
import IDragAndDrop, {IDraggableObject} from '../interfaces/dragAndDrop';
import ISizer from '../interfaces/sizer';
import IEventStore from '../interfaces/eventStore';

interface IOverlay extends IDraggableObject {
  image: HTMLImageElement;
  id: string;
}

@injectable()
export class ImageScene implements IScene {
  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) public logger: ILogger,
    @inject(SERVICE_IDENTIFIER.IMAGE_LOADER) public imageService: IImageLoader,
    @inject(SERVICE_IDENTIFIER.SIZER) public sizeService: ISizer,
    @inject(SERVICE_IDENTIFIER.EVENT_STORE) public eventStoreService: IEventStore,
    @inject(SERVICE_IDENTIFIER.DRAG_AND_DROP) public dragAndDropService: IDragAndDrop,
  ) {}

  private canvasElement?: HTMLCanvasElement;
  private canvasContext?: CanvasRenderingContext2D;
  private overlayImages: IOverlay[] = [];
  private draggedOverlay: IOverlay | null = null;

  public init(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvasElement = canvas;
    this.canvasContext = context;
  }

  public async addObjects() {
    await this.renderOverlays();

    this.registerOnMouseDown();
    this.registerOnMouseMove();
    this.registerOnMouseUp();
    this.registerOnMouseOut();
  }

  private async renderOverlays() {
    const images = await this.loadImages();
    this.overlayImages = this.getOverlays(images);

    this.drawOverlays();
  }

  private getOverlays(images: HTMLImageElement[]): IOverlay[] {
    // TODO: call persistance storage to load previous positions
    // this.persistanceService.loadPreviousState();

    // Perform any reordering in overlay list. First will be drawn below the next
    // e.g. images.reverse() will put last image on top

    return images.map((image, index) => ({
      image,
      pX: index * 120,
      pY: 0,
      imageSize: IMAGE_OVERLAY_SIZE,
      id: `id-${index}`,
      isActive: false,
    }));
  }

  private async loadImages() {
    return await this.imageService.getImages();
  }

  private drawOverlays() {
    const cw = this.canvasElement!.width;
    const ch = this.canvasElement!.height;
    this.canvasContext!.clearRect(0, 0, cw, ch);

    this.overlayImages.forEach((overlay) => {
      this.canvasContext!.drawImage(
        overlay.image,
        overlay.pX,
        overlay.pY,
        overlay.imageSize,
        overlay.imageSize,
      );

      if (overlay.isActive) {
        // TODO: move color values to theme config
        this.canvasContext!.strokeStyle = '#669900';
        this.canvasContext!.strokeRect(
          overlay.pX,
          overlay.pY,
          overlay.imageSize,
          overlay.imageSize,
        );
      }
    });
  }

  private registerOnMouseDown() {
    if (!this.canvasElement) {
      this.logger.log('Canvas not found!');
      return;
    }

    this.dragAndDropService.onMouseDown(this.canvasElement, this.overlayImages, (image) => {
      image.isActive = true;
      this.draggedOverlay = image as IOverlay;
    });
  }

  private registerOnMouseUp() {
    if (!this.canvasElement) {
      this.logger.log('Canvas not found!');
      return;
    }

    this.dragAndDropService.onMouseUp(this.canvasElement, () => {
      if (this.draggedOverlay) {
        this.overlayImages.forEach((image) => {
          image.isActive = false;
        });
        this.eventStoreService.push(
          `moved overlay with id ${this.draggedOverlay.id} to position x:${this.draggedOverlay.pX}, y: ${this.draggedOverlay.pY}`,
        );

        this.draggedOverlay = null;

        this.drawOverlays();
      }
    });
  }

  private registerOnMouseOut() {
    if (!this.canvasElement) {
      this.logger.log('Canvas not found!');
      return;
    }

    this.dragAndDropService.onMouseOut(this.canvasElement, () => {
      if (this.draggedOverlay) {
        this.overlayImages.forEach((image) => {
          image.isActive = false;
        });
        this.eventStoreService.push(
          `moved overlay with id ${this.draggedOverlay.id} to position x:${this.draggedOverlay.pX}, y: ${this.draggedOverlay.pY}`,
        );

        this.draggedOverlay = null;

        this.drawOverlays();
      }
    });
  }

  private registerOnMouseMove() {
    if (!this.canvasElement) {
      this.logger.log('Canvas not found!');
      return;
    }

    this.dragAndDropService.onMouseMove(this.canvasElement, (dX, dY) => {
      if (!this.draggedOverlay) return;

      // prevent overlay going out of canvas bounds
      const newPositionX = this.draggedOverlay.pX + dX;
      const newPositionY = this.draggedOverlay.pY + dY;
      const inInBounds = this.sizeService.isInCanvasBounds(
        newPositionX,
        newPositionY,
        this.draggedOverlay.imageSize,
        this.canvasElement!,
      );

      if (inInBounds) {
        this.draggedOverlay.pX += dX;
        this.draggedOverlay.pY += dY;

        this.drawOverlays();
      }
    });
  }
}
