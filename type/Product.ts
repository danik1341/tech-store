export type Product = {
    _id: string;
    _createdAt: Date;
    images: {
        url: string;
      }[];
    name: string;
    slug: string;
    price: string;
    details: string;
}