import IMessage from "./IMessage";
import IUser from "./IUser";

export default interface IChatMessage {
    chat: IMessage
    user: IUser,
    slot: string
}