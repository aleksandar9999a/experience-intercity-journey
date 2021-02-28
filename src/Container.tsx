import { Container } from 'inversify';
import { PixabayConfig } from './config/PixabayConfig';
import { AuthManager } from './services/AuthManager';
import { ErrorManager } from './services/ErrorManager';
import { MessageManager } from './services/MessageManager';
import { Pixabay } from './services/PixabayManager';
import { PublicationsManager } from './services/PublicationsManager';
import { RouterManager } from './services/RouterManager';
import { ValidationManager } from './services/ValidationManager';
import type from './Types';

const container = new Container();

container.bind<RouterManager>(type.RouterManager).to(RouterManager).inSingletonScope();
container.bind<Pixabay>(type.Pixabay).to(Pixabay).inSingletonScope();
container.bind<PixabayConfig>(type.PixabayConfig).to(PixabayConfig).inSingletonScope();
container.bind<ErrorManager>(type.ErrorManager).to(ErrorManager).inSingletonScope();
container.bind<AuthManager>(type.AuthManager).to(AuthManager).inSingletonScope();
container.bind<MessageManager>(type.MessageManager).to(MessageManager).inSingletonScope();
container.bind<ValidationManager>(type.ValidationManager).to(ValidationManager).inSingletonScope();
container.bind<PublicationsManager>(type.PublicationsManager).to(PublicationsManager).inSingletonScope();

export const routerManager = container.resolve(RouterManager)