export default interface IChat {
    id: string;
    creatorId: string;
    members: string[];
    lastUpdate: Date;
}