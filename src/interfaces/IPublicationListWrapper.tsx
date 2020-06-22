import IPublication from "./IPublication";

export default interface IPublicationListWrapper {
    publications: IPublication[],
    isLoading: boolean
}