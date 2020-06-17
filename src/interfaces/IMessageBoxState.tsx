export default interface IMessageBoxState {
    id: string,
    creatorId: string,
    members: string[],
    isOpen?: boolean,
    to: string,
    firstName: string,
    lastName: string
}