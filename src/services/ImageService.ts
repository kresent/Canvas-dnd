import {injectable} from 'inversify';
import IImageLoader from '../interfaces/imageLoader';

import imageSrc1 from '../../assets/placeholder1.jpg';
import imageSrc2 from '../../assets/placeholder2.jpg';

@injectable()
export class ImageService implements IImageLoader {
  public async getImages() {
    const srcList = [imageSrc1 as string, imageSrc2 as string];

    const images = srcList.map((image) => {
      const img = new Image();
      img.src = image;

      return img;
    });

    await this.loadImages(images);

    return images;
  }

  private loadImages(images: HTMLImageElement[]) {
    // Images are loaded asynchronously, so we need to wait till every one is ready to render
    const totalImagesToLoad = images.length;
    let loadedImages = 0;

    return new Promise((resolve, reject) => {
      images.forEach((image, index) => {
        image.onload = () => {
          ++loadedImages;

          if (loadedImages === totalImagesToLoad) {
            resolve(loadedImages);
          }
        };
      });
    });
  }
}
