import IMessage from "./IMessage";
import { IUser } from "./interfaces";

export default interface IChatMessage {
    chat: IMessage
    user: IUser,
    slot: string
}