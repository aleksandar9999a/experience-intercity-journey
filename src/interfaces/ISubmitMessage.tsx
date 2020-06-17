export default interface ISubmitMessage {
    id: string,
    members: string[],
    creatorId: string,
    message: string,
    firstName: string,
    lastName: string,
    to: string
}