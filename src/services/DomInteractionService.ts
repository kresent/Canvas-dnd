import {injectable} from 'inversify';

import IDomInteractor from '../interfaces/domInteractor';

@injectable()
export class DomInteractionService implements IDomInteractor {
  getCanvas(elementId: string) {
    const canvasElement = document.getElementById(elementId) as HTMLCanvasElement;
    const canvasContext = canvasElement?.getContext('2d');

    if (canvasContext) {
      return {canvasElement: canvasElement, canvasContext: canvasContext};
    } else {
      return null;
    }
  }

  public getWindowSize() {
    return {height: window.innerHeight, width: window.innerWidth};
  }

  public addWindowResizeListener(onResize: () => void) {
    function reportWindowSize() {
      onResize();
    }

    window.onresize = reportWindowSize;
  }
}
