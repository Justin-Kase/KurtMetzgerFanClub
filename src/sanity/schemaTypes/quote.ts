import { defineField, defineType } from 'sanity'

export const quoteSchema = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Kurt Metzger',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'author',
    },
    prepare({ title, subtitle }) {
      return {
        title: title?.slice(0, 60) + (title?.length > 60 ? '...' : ''),
        subtitle,
      }
    },
  },
})
