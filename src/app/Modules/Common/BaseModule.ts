
export interface BaseModule<T> {
    iD: T | null;
    deletedby: number | null;
    createdBy: number | null;
    createdOn: string;
    modifiedBy: number | null;
    modifiedOn: string | null;
    isDeleted: boolean;
}