import { defineConfig } from 'sanity';
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import { schemas } from './sanity/schemas';

const config = defineConfig({
  name: 'default',
  title: 'tech-sanity',

  projectId: 'tgjp344g',
  dataset: 'production',
  apiVersion: '2023-05-02',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,

  basePath: '/admin',

  plugins: [deskTool(), visionTool()],

  schema: { types: schemas }
})

export default config;