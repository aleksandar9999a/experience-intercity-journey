export default interface IGetPublications {
    search?: string,
    opStr?: firebase.firestore.WhereFilterOp,
    searchBy?: string
}