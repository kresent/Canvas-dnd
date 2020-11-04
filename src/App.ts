import SERVICE_IDENTIFIER from './constants';
import {IScene, ISceneController} from './interfaces/scene';
import container from './iocConfig';

const sceneController = container.get<ISceneController>(SERVICE_IDENTIFIER.SCENE_CONTROLLER);
const overlayScene = container.get<IScene>(SERVICE_IDENTIFIER.OVERLAY_SCENE);

sceneController.init('canvas');
sceneController.setScene(overlayScene);
sceneController.runScene();
