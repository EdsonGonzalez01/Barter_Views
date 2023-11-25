import { File } from "./file";

export interface Barter {
    _id: string,
    title: string;
    description: string;
    status: string;
    files?: File[];
    imageUrl?: string;
    date: Date;
    offerer: string;
  }
  