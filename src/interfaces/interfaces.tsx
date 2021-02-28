import { AuthManager } from '../services/AuthManager';
import { ChatManager } from '../services/ChatManager';
import { MessageManager } from '../services/MessageManager';
import { PixabayManager } from '../services/PixabayManager';
import { PublicationsManager } from '../services/PublicationsManager';
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

export interface ILoginProps {
  authManager: AuthManager,
  validationManager: ValidationManager,
  routerManager: RouterManager,
  messageManager: MessageManager
}

export interface IRegisterProps {
  authManager: AuthManager,
  validationManager: ValidationManager,
  routerManager: RouterManager,
  messageManager: MessageManager
}

export interface ISearchProps {
  routerManager: RouterManager,
  publicationsManager: PublicationsManager
  pixabayManager: PixabayManager
}

export interface IMyPublicationsProps {
  routerManager: RouterManager,
  publicationsManager: PublicationsManager,
  authManager: AuthManager,
  pixabayManager: PixabayManager
}

export interface IPublicationListItemProps {
  data: IPublication,
  pixabayManager: PixabayManager
}

export interface ICreatePublicationProps {
  routerManager: RouterManager,
  publicationsManager: PublicationsManager,
  authManager: AuthManager,
  validationManager: ValidationManager,
  messageManager: MessageManager
}

export interface IDetailsProps {
  routerManager: RouterManager,
  authManager: AuthManager,
  publicationsManager: PublicationsManager,
  validationManager: ValidationManager,
  messageManager: MessageManager,
  pixabayManager: PixabayManager
}

export interface IAccountProps {
  routerManager: RouterManager,
  authManager: AuthManager,
  validationManager: ValidationManager,
  messageManager: MessageManager
}

export interface IMessagesProps {
  routerManager: RouterManager,
  chatManager: ChatManager,
  authManager: AuthManager,
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
  authManager: AuthManager
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
  authManager: AuthManager,
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