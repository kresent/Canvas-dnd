export default interface IImageLoader {
  getImages: () => Promise<HTMLImageElement[]>;
}
