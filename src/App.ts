import SERVICE_IDENTIFIER from './constants';
import {IScene, ISceneController} from './interfaces/scene';
import container from './iocConfig';

const sceneController = container.get<ISceneController>(SERVICE_IDENTIFIER.SCENE_CONTROLLER);
const imageScene = container.get<IScene>(SERVICE_IDENTIFIER.IMAGE_SCENE);

sceneController.init('canvas');
sceneController.setScene(imageScene);
sceneController.runScene();
