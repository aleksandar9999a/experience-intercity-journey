import IPublication from "./IPublication";

export default interface IUsePublication {
    publication: IPublication | null,
    loading: boolean,
    setParams: Function
}