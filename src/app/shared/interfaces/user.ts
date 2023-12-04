import { File } from "./file";

export interface User {
    _id?: string;
    name: string;
    lastName:string,
    email: string;
    password?: string;
    location?: string;
    status?: string;
    files?: File[];
    roles: string[],
}
