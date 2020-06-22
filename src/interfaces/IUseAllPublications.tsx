import IPublication from "./IPublication";

export default interface IUseAllPublications {
    publications: IPublication[],
    loading: boolean,
    changeOptions: Function
}