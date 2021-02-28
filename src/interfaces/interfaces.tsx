import { AuthManager } from "../services/AuthManager";

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