const SERVICE_IDENTIFIER = {
  SCENE_CONTROLLER: Symbol.for('SceneController'),
  OVERLAY_SCENE: Symbol.for('OverlayScene'),
  DOMINTERACTOR: Symbol.for('DomInteractor'),
  SIZER: Symbol.for('Sizer'),
  IMAGE_LOADER: Symbol.for('ImageLoader'),
  DRAG_AND_DROP: Symbol.for('DragAndDrop'),
  EVENT_STORE: Symbol.for('EventStore'),
  LOGGER: Symbol.for('Logger'),
};

// Assume all scenes have 16:9 aspect ratio. If needs to change, create a separate config service
export const CANVAS_HEIGHT_ASPECT_RATIO = 0.5625;

export const IMAGE_OVERLAY_SIZE = 100;

export default SERVICE_IDENTIFIER;
