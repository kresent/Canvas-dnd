export default interface IDragAndDrop {
  onMouseDown: (
    canvasElement: HTMLCanvasElement,
    draggableObjects: IDraggableObject[],
    onSuccessfulSelect: (image: IDraggableObject) => void,
  ) => void;
  onMouseUp: (canvasElement: HTMLCanvasElement, callback: () => void) => void;
  onMouseMove: (
    canvasElement: HTMLCanvasElement,
    onImageMove: (dX: number, dY: number) => void,
  ) => void;
  onMouseOut: (canvasElement: HTMLCanvasElement, callback: () => void) => void;
}

export interface IDraggableObject {
  imageSize: number;
  pX: number;
  pY: number;
  isActive: boolean;
}
