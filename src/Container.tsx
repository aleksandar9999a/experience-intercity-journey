import { Container } from 'inversify';
import { PixabayConfig } from './config/PixabayConfig';
import { ErrorManager } from './services/ErrorManager';
import { Pixabay } from './services/PixabayManager';
import type from './Types';

const container = new Container();

container.bind<Pixabay>(type.Pixabay).to(Pixabay);
container.bind<PixabayConfig>(type.PixabayConfig).to(PixabayConfig);
container.bind<ErrorManager>(type.ErrorManager).to(ErrorManager);

console.debug(container.resolve(Pixabay))