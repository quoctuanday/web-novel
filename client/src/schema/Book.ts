export type Book = {
    _id: string;
    title: string;
    author: string;
    description: string;
    image: string;
    numberOfChapter: number;
    type: string[];
    createdAt?: Date;
    updatedAt?: Date;
};
