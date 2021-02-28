import { AuthManager } from "../services/AuthManager";
import { RouterManager } from "../services/RouterManager";

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
  authManager: AuthManager
}

export interface IAppProps {
  routerManager: RouterManager
}