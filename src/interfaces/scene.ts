export interface ISceneInitializer {
  setScene: (scene: IScene) => void;
  init: (elementId: string) => void;
  startScene: () => void;
}

export interface IScene {
  start: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
}
