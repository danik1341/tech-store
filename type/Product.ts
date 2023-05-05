export type Product = {
    _id: string;
    _createdAt: Date;
    images: {
        url: string;
      }[];
    name: string;
    slug: string;
    price: number;
    details: string;
    quantity: number;
}