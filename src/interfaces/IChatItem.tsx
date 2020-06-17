export default interface IChatItem {
    id: string,
    members: string[],
    creatorId: string,
    to: string,
    firstName: string,
    lastName: string
}