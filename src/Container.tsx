import { Container } from 'inversify';
import { PixabayConfig } from './config/PixabayConfig';
import { AuthManager } from './services/AuthManager';
import { ErrorManager } from './services/ErrorManager';
import { MessageManager } from './services/MessageManager';
import { Pixabay } from './services/PixabayManager';
import { RouterManager } from './services/RouterManager';
import { ValidationManager } from './services/ValidationManager';
import type from './Types';

const container = new Container();

container.bind<RouterManager>(type.RouterManager).to(RouterManager);
container.bind<Pixabay>(type.Pixabay).to(Pixabay);
container.bind<PixabayConfig>(type.PixabayConfig).to(PixabayConfig);
container.bind<ErrorManager>(type.ErrorManager).to(ErrorManager);
container.bind<AuthManager>(type.AuthManager).to(AuthManager);
container.bind<MessageManager>(type.MessageManager).to(MessageManager);
container.bind<ValidationManager>(type.ValidationManager).to(ValidationManager);

export const routerManager = container.resolve(RouterManager)