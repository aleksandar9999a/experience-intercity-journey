import { UserService } from '../services/user-service';
import { ChatService } from '../services/chat-service';
import { MessageService } from '../services/message-service';
import { PixabayService } from '../services/pixabay-service';
import { PublicationsService } from '../services/publications-service';
import { RouterManager } from '../services/RouterManager';
import { ValidationManager } from '../services/ValidationManager';


export interface IRegistered {
  email: string,
  password: string,
  city: string,
  firstName: string,
  lastName: string,
  darkMode?: boolean
}

export interface IQuery {
  per_page?: number,
  page?: number,
  q?: string,
  key?: string
}

export interface IRoute {
  id: number,
  path: string,
  Component: React.FC<any>,
  props?: {
    [key: string]: any
  }
}

export interface IChatMessage {
  created: Date,
  creatorId: string,
  id: string,
  message: string
}

export interface IChat {
  id: string;
  creatorId: string;
  members: string[];
  lastUpdate: Date;
}

export interface IChatProps {
  routerManager: RouterManager,
  userService: UserService,
  chatService: ChatService
}

export interface ILoginProps {
  userService: UserService,
  validationManager: ValidationManager,
  routerManager: RouterManager,
  messageService: MessageService
}

export interface IRegisterProps {
  userService: UserService,
  validationManager: ValidationManager,
  routerManager: RouterManager,
  messageService: MessageService
}

export interface ISearchProps {
  routerManager: RouterManager,
  publicationsService: PublicationsService
  pixabayService: PixabayService
}

export interface IMyPublicationsProps {
  routerManager: RouterManager,
  publicationsService: PublicationsService,
  userService: UserService,
  pixabayService: PixabayService
}

export interface IPublicationListItemProps {
  data: IPublication,
  pixabayService: PixabayService
}

export interface ICreatePublicationProps {
  routerManager: RouterManager,
  publicationsService: PublicationsService,
  userService: UserService,
  validationManager: ValidationManager,
  messageService: MessageService
}

export interface IDetailsProps {
  routerManager: RouterManager,
  userService: UserService,
  publicationsService: PublicationsService,
  validationManager: ValidationManager,
  messageService: MessageService,
  pixabayService: PixabayService,
  chatService: ChatService
}

export interface IAccountProps {
  routerManager: RouterManager,
  userService: UserService,
  validationManager: ValidationManager,
  messageService: MessageService
}

export interface IMessagesProps {
  routerManager: RouterManager,
  chatService: ChatService,
  userService: UserService,
}

export interface IAppProps {
  routerManager: RouterManager
}

export interface IPixabayImage {
  comments: number,
  downloads: number,
  favorites: number,
  id: number,
  imageHeight: number,
  imageSize: number,
  imageWidth: number,
  largeImageURL: string,
  likes: number,
  pageURL: string,
  previewHeight: number,
  previewURL: string,
  previewWidth: number,
  tags: string,
  type: string,
  user: string,
  userImageURL: string,
  user_id: number,
  views: number,
  webformatHeight: number,
  webformatURL: string,
  webformatWidth: number
}

export interface IMessage {
  id: number | string,
  message: string,
  type: 'danger' | 'warning' | 'success' | ''
}

export interface IChatItem {
  id: string,
  members: string[],
  creatorId: string
}

export interface IMessageItem {
  id: string, 
  creatorId?: string, 
  members: string[],
  userService: UserService
}

export interface IUser {
  firstName: string,
  lastName: string,
  city: string,
  uid: string,
  image?: string,
  email: string,
  darkMode: boolean
}

export interface IMenuProps {
  menu: IAppPage[],
  userService: UserService,
  routerManager: RouterManager
}

export interface IAppPage {
  id: number | string;
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

export interface IPublication {
  id?: string,
  creatorId?: string,
  from: string,
  to: string,
  date: string,
  time: string,
  type: string
}

export interface IGetPublications {
  search?: string,
  opStr?: firebase.firestore.WhereFilterOp,
  searchBy?: string
}

export interface IMemberItems {
  image?: string, 
  firstName: string, 
  lastName: string
}

export interface IFabMenuItem {
  id: string | number,
  route: string;
  iosIcon: string;
  mdIcon: string;
}