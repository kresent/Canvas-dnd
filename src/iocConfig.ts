import 'reflect-metadata';

import {Container} from 'inversify';

import {IScene, ISceneController} from './interfaces/scene';
import ILogger from './interfaces/logger';

import {OverlayScene, SceneController} from './entities';
import {LoggerService} from './services/LoggerService';
import {DomInteractionService} from './services/DomInteractionService';

import SERVICE_IDENTIFIER from './constants/';
import IDomInteractor from './interfaces/domInteractor';
import ISizer from './interfaces/sizer';
import {SizeService} from './services/SizeService';
import IImageLoader from './interfaces/imageLoader';
import {ImageService} from './services/ImageService';
import IDragAndDrop from './interfaces/dragAndDrop';
import {DragAndDropService} from './services/DragNDropService';
import IEventStore from './interfaces/eventStore';
import {EventStoreService} from './services/EventStoreService';

const container = new Container();

container.bind<ISceneController>(SERVICE_IDENTIFIER.SCENE_CONTROLLER).to(SceneController);
container.bind<IScene>(SERVICE_IDENTIFIER.OVERLAY_SCENE).to(OverlayScene);
container.bind<IDomInteractor>(SERVICE_IDENTIFIER.DOMINTERACTOR).to(DomInteractionService);
container.bind<ISizer>(SERVICE_IDENTIFIER.SIZER).to(SizeService);
container.bind<IImageLoader>(SERVICE_IDENTIFIER.IMAGE_LOADER).to(ImageService);
container.bind<IDragAndDrop>(SERVICE_IDENTIFIER.DRAG_AND_DROP).to(DragAndDropService);
container.bind<IEventStore>(SERVICE_IDENTIFIER.EVENT_STORE).to(EventStoreService);
container.bind<ILogger>(SERVICE_IDENTIFIER.LOGGER).to(LoggerService);

export default container;
