import IPublication from "./IPublication";

export default interface IUseMyPublications {
    publications: IPublication[],
    loading: boolean
}