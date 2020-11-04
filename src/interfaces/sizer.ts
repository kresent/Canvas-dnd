export interface ISizes {
  width: number;
  height: number;
}

export default interface ISizer {
  calculateCanvasSize: (sizes: ISizes) => ISizes;
}
