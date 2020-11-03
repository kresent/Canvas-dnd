import SERVICE_IDENTIFIER from './constants';
import {IScene, ISceneInitializer} from './interfaces/scene';
import container from './iocConfig';

const renameMe_sdasdasdadasdadasdas = container.get<ISceneInitializer>(
  SERVICE_IDENTIFIER.SCENE_INITIALIZER,
);
const sc2 = container.get<IScene>(SERVICE_IDENTIFIER.IMAGE_SCENE);

renameMe_sdasdasdadasdadasdas.init('canvas');
renameMe_sdasdasdadasdadasdas.setScene(sc2);
renameMe_sdasdasdadasdadasdas.startScene();
