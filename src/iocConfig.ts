import 'reflect-metadata';

import {Container} from 'inversify';

import {ILoggerService, IScene, ISceneInitializer} from './interfaces';

import {ImageScene, SceneInitializer} from './entities';
import {LoggerService} from './services';

import SERVICE_IDENTIFIER from './constants/';

const container = new Container();

container.bind<ISceneInitializer>(SERVICE_IDENTIFIER.SCENE_INITIALIZER).to(SceneInitializer);
container.bind<IScene>(SERVICE_IDENTIFIER.IMAGE_SCENE).to(ImageScene);
container.bind<ILoggerService>(SERVICE_IDENTIFIER.LOGGER).to(LoggerService);

export default container;
