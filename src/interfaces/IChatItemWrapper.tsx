import { IUser } from "./interfaces";
import IMessage from "./IMessage";

export default interface IChatItemWrapper {
    users: IUser[], 
    data: IMessage
    myUid: string
}