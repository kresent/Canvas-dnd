import {injectable} from 'inversify';
import {CANVAS_HEIGHT_ASPECT_RATIO} from '../constants';

import ISizer, {ISizes} from '../interfaces/sizer';

@injectable()
export class SizeService implements ISizer {
  calculateCanvasSize(sizes: ISizes) {
    let targetWidth = sizes.width;
    if (targetWidth * CANVAS_HEIGHT_ASPECT_RATIO > sizes.height) {
      targetWidth = sizes.height / CANVAS_HEIGHT_ASPECT_RATIO;
    }

    return {width: targetWidth, height: targetWidth * CANVAS_HEIGHT_ASPECT_RATIO};
  }
}
