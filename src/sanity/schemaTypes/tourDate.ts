import { defineField, defineType } from 'sanity'

export const tourDateSchema = defineType({
  name: 'tourDate',
  title: 'Tour Date',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Show Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City, State',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Ticket Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold Out',  value: 'sold-out'  },
          { title: 'Presale',   value: 'presale'   },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket Purchase URL',
      type: 'url',
    }),
    defineField({
      name: 'price',
      title: 'Price Range',
      type: 'string',
      description: 'e.g. "$25-35" or "SOLD OUT"',
    }),
    defineField({
      name: 'showTime',
      title: 'Show Time(s)',
      type: 'string',
      description: 'e.g. "8:00 PM & 10:30 PM"',
    }),
  ],
  preview: {
    select: {
      title: 'venue',
      subtitle: 'city',
      date: 'date',
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: `${subtitle} — ${date}`,
      }
    },
  },
})
