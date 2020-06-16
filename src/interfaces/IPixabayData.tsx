import IPixabayImage from "./IPixabayImage";

export default interface IPixabayData {
    hits: IPixabayImage[],
    total: number,
    totalHits: number
}