import {ISizes} from './sizer';

export default interface IDomInteractor {
  getCanvas: (
    elementId: string,
  ) => {canvasElement: HTMLCanvasElement; canvasContext: CanvasRenderingContext2D} | null;
  getWindowSize: () => ISizes;
  addWindowResizeListener: (onresize: () => void) => void;
}
