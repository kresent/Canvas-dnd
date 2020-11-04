export interface ISceneController {
  setScene: (scene: IScene) => void;
  init: (elementId: string) => void;
  runScene: () => void;
}

export interface IScene {
  init: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
  addInteractions: () => void;
}
