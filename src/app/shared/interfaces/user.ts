export interface User {
    _id?: string;
    name: string;
    lastName:string,
    email: string;
    password?: string;
    location?: string;
    status?: string;
    imageUrl?: string;
    roles?: [],
}
