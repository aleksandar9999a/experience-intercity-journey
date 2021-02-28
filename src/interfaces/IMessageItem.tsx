import { AuthManager } from "../services/AuthManager";

export default interface IMessageItem {
    id: string, 
    creatorId?: string, 
    members: string[],
    authManager: AuthManager
}