// =====================================================
// Sanity Schema — Kurt Metzger Fanclub CMS
// =====================================================

import { tourDateSchema } from './schemaTypes/tourDate'
import { videoSchema } from './schemaTypes/video'
import { quoteSchema } from './schemaTypes/quote'
import { blogPostSchema } from './schemaTypes/blogPost'

export const schema = {
  types: [tourDateSchema, videoSchema, quoteSchema, blogPostSchema],
}
