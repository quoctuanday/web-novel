export type Book = {
    _id: string;
    title: string;
    author: string;
    description: string;
    image: string;
    numberOfChapter: number;
    type: string[];
    status: String;
    createdAt?: Date;
    updatedAt?: Date;
};
