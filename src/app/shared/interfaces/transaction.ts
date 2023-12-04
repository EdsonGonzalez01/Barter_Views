export interface Transaction {
    _id?: string,
    offerer: string,
    consumer: string,
    offeredBarter: string,
    desiredBarter: string,
    accepted: boolean,
    date?: Date,
}