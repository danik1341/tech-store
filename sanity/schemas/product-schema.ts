import { ImageInput, Rule } from "sanity";

const product = {
    name: 'product',
    title: 'Products',
    type: 'document',
    fields: [
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
              {
                type: 'image',
                fields: [
                  {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text'
                  }
                ],
                options: {
                  hotspot: true
                }
              }
            ]
          },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        },
    ]
}

export default product;