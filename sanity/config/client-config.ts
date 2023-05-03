"use client";

import { createClient, ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'


const config: ClientConfig = {
  projectId: 'tgjp344g',
  dataset: 'production',
  apiVersion: '2023-05-02',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
}

const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source: string) => {
  return builder.image(source);
};
export default client;