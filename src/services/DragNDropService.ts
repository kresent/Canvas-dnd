import {injectable} from 'inversify';
import IDragAndDrop, {IDraggableObject} from '../interfaces/dragAndDrop';

@injectable()
export class DragAndDropService implements IDragAndDrop {
  private lastX: number = 0;
  private lastY: number = 0;
  private isMouseDown: boolean = false;

  public onMouseDown(
    canvasElement: HTMLCanvasElement,
    draggableObjects: IDraggableObject[],
    onSuccessfulSelect: (image: IDraggableObject) => void,
  ) {
    const offsetX = canvasElement.offsetLeft;
    const offsetY = canvasElement.offsetTop;

    canvasElement.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      this.lastX = evt.clientX - offsetX;
      this.lastY = evt.clientY - offsetY;
      const totalOverlays = draggableObjects.length;

      for (let i = 0; i < totalOverlays; i++) {
        const draggableObject = draggableObjects[i];
        if (
          this.lastX > draggableObject.pX &&
          this.lastX < draggableObject.pX + draggableObject.imageSize &&
          this.lastY > draggableObject.pY &&
          this.lastY < draggableObject.pY + draggableObject.imageSize
        ) {
          onSuccessfulSelect(draggableObject);
          this.isMouseDown = true;
          return;
        }
      }
    });
  }
  public onMouseMove(
    canvasElement: HTMLCanvasElement,
    onImageMove: (dX: number, dY: number) => void,
  ) {
    canvasElement.addEventListener('mousemove', (evt) => {
      if (!this.isMouseDown) {
        return;
      }

      evt.preventDefault();
      evt.stopPropagation();

      const offsetX = canvasElement.offsetLeft;
      const offsetY = canvasElement.offsetTop;

      const mouseX = evt.clientX - offsetX;
      const mouseY = evt.clientY - offsetY;

      // calculate how far the mouse has moved since the last mousemove event was processed
      const dX = mouseX - this.lastX;
      const dY = mouseY - this.lastY;
      // reset the lastX/Y to the current mouse position
      this.lastX = mouseX;
      this.lastY = mouseY;

      onImageMove(dX, dY);
    });
  }
  public onMouseUp(canvasElement: HTMLCanvasElement, callback: () => void) {
    canvasElement.addEventListener('mouseup', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      this.isMouseDown = false;

      callback?.();
    });
  }
  public onMouseOut(canvasElement: HTMLCanvasElement, callback: () => void) {
    canvasElement.addEventListener('mouseup', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      this.isMouseDown = false;

      callback?.();
    });
  }
}
