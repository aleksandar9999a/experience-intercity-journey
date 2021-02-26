import { Container } from 'inversify';
import { PixabayConfig } from './config/PixabayConfig';
import { ErrorManager } from './services/ErrorManager';
import { Pixabay } from './services/PixabayManager';
import { RouterManager } from './services/RouterManager';
import type from './Types';

const container = new Container();

container.bind<RouterManager>(type.RouterManager).to(RouterManager);
container.bind<Pixabay>(type.Pixabay).to(Pixabay);
container.bind<PixabayConfig>(type.PixabayConfig).to(PixabayConfig);
container.bind<ErrorManager>(type.ErrorManager).to(ErrorManager);

export const routerManager = container.resolve(RouterManager)