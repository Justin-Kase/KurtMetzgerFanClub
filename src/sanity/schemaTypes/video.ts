import { defineField, defineType } from 'sanity'

export const videoSchema = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'The ID from the YouTube URL (e.g. dQw4w9WgXcQ)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Comedy Specials',    value: 'specials'    },
          { title: 'Jimmy Dore Show',    value: 'jimmy-dore'  },
          { title: 'Podcast Appearances', value: 'podcasts'   },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      youtubeId: 'youtubeId',
    },
    prepare({ title, subtitle, youtubeId }) {
      return {
        title,
        subtitle: `[${subtitle}] — ${youtubeId}`,
      }
    },
  },
})
