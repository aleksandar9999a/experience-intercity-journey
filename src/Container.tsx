import { Container } from 'inversify';
import { PixabayConfig } from './config/PixabayConfig';
import { UserService } from './services/user-service';
import { ChatService } from './services/chat-service';
import { MessageService } from './services/message-service';
import { PixabayService } from './services/pixabay-service';
import { PublicationsService } from './services/publications-service';
import { RouterManager } from './services/RouterManager';
import { ValidationManager } from './services/ValidationManager';
import type from './Types';

const container = new Container();

container.bind<RouterManager>(type.RouterManager).to(RouterManager).inSingletonScope();
container.bind<PixabayService>(type.PixabayService).to(PixabayService).inSingletonScope();
container.bind<PixabayConfig>(type.PixabayConfig).to(PixabayConfig).inSingletonScope();
container.bind<UserService>(type.UserService).to(UserService).inSingletonScope();
container.bind<MessageService>(type.MessageService).to(MessageService).inSingletonScope();
container.bind<ValidationManager>(type.ValidationManager).to(ValidationManager).inSingletonScope();
container.bind<PublicationsService>(type.PublicationsService).to(PublicationsService).inSingletonScope();
container.bind<ChatService>(type.ChatService).to(ChatService).inSingletonScope();

export const routerManager = container.resolve(RouterManager)