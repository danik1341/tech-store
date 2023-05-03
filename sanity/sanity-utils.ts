"use client"

import { groq } from 'next-sanity';
import client from './config/client-config';
import { Product } from '@/type/Product';
import { Banner } from '@/type/Banner';

export async function getProducts(): Promise<Product[]> {
    return client.fetch(
        groq`*[_type == "product"]{
            _id,
            _createdAt,
            "images": images[]{
              "url": asset->url
            },
            name,
            "slug": slug.current,
            price,
            details,
        }`          
    )
}
export async function getProduct(slug: string): Promise<Product> {
    return client.fetch(
        groq`*[_type == "product" && slug.current == $slug] | order(_createdAt desc) [0]{
            _id,
            _createdAt,
            "images": images[]{
              "url": asset->url
            },
            name,
            "slug": slug.current,
            price,
            details,
        }`,
        { slug }
    )
}

export async function getBannersData(): Promise<Banner[]> {
    return client.fetch(
        groq`*[_type == "banner"]`
    )
}
