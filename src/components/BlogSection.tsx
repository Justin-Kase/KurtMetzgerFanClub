'use client'

import { useState } from 'react'
import { marked } from 'marked'
import type { BlogPost } from '@/lib/types'

interface BlogSectionProps {
  posts: BlogPost[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [postContent, setPostContent] = useState<string>('')
  const [loading, setLoading] = useState(false)

  async function openPost(post: BlogPost) {
    if (!post.slug) {
      alert('Blog post coming soon! Stay tuned for more Metzger insights.')
      return
    }

    setSelectedPost(post)
    setLoading(true)

    try {
      const response = await fetch(`/api/blog/${post.slug}`)
      const data = await response.json()
      
      if (data.content) {
        const html = await marked(data.content)
        setPostContent(html)
      } else {
        setPostContent('<p>Content not available.</p>')
      }
    } catch (error) {
      setPostContent('<p>Failed to load blog post.</p>')
    } finally {
      setLoading(false)
    }
  }

  function closePost() {
    setSelectedPost(null)
    setPostContent('')
  }

  return (
    <section id="blog" className="py-20" style={{ background: 'var(--color-primary-black)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">
            <span className="text-accent-red mr-3">🧠</span>
            METZGER MIND
          </h2>
          <p className="section-subtitle">Satirical takes and fan essays</p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="blog-post"
              role="button"
              tabIndex={0}
              onClick={() => openPost(post)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') openPost(post)
              }}
            >
              <div className="blog-post-image">
                {post.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-5xl opacity-20"
                    style={{ background: 'var(--color-dark-gray)' }}
                    aria-hidden="true"
                  >
                    💀
                  </div>
                )}
              </div>
              <div className="blog-post-content">
                <h5>{post.title}</h5>
                <p>{post.excerpt}</p>
                <div className="blog-post-meta">
                  {post.date} &bull; {post.readTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
          onClick={closePost}
        >
          <div className="min-h-screen flex items-start justify-center p-4 py-12">
            <div
              className="relative w-full max-w-4xl bg-gradient-to-b from-dark-card to-black border-2 border-occult-purple/50 rounded-lg shadow-2xl shadow-occult-purple/20"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: '0 0 60px rgba(138, 43, 226, 0.3), 0 0 120px rgba(220, 53, 69, 0.2)',
              }}
            >
              {/* Decorative Header Bar */}
              <div className="h-1 bg-gradient-to-r from-occult-purple via-accent-red to-occult-purple opacity-50" />

              {/* Close Button */}
              <button
                onClick={closePost}
                className="absolute top-6 right-6 text-gray-400 hover:text-accent-red text-3xl font-bold transition-colors z-10 w-10 h-10 flex items-center justify-center"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Article Header */}
              <div className="px-8 md:px-12 pt-10 pb-6 border-b border-occult-purple/20">
                <h1 
                  className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                  style={{
                    fontFamily: 'var(--font-oswald)',
                    color: 'var(--color-accent-red)',
                    textShadow: '0 0 20px rgba(220, 53, 69, 0.5)',
                    letterSpacing: '1px',
                  }}
                >
                  {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-20">
                  <div className="inline-block w-12 h-12 border-4 border-accent-red border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-400 mt-4">Summoning wisdom from the void...</p>
                </div>
              )}

              {/* Article Content */}
              {!loading && (
                <article 
                  className="px-8 md:px-12 py-8 pb-12"
                  style={{
                    fontFamily: 'var(--font-roboto-mono)',
                  }}
                >
                  <div
                    className="blog-article-content
                      [&_h1]:text-accent-red [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8 [&_h1]:tracking-wide
                      [&_h2]:text-accent-red [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:tracking-wide
                      [&_h3]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-8
                      [&_p]:text-gray-300 [&_p]:mb-5 [&_p]:leading-relaxed [&_p]:text-base
                      [&_strong]:text-white [&_strong]:font-bold
                      [&_em]:text-gray-400 [&_em]:italic
                      [&_ul]:text-gray-300 [&_ul]:mb-5 [&_ul]:ml-6 [&_ul]:list-disc
                      [&_ol]:text-gray-300 [&_ol]:mb-5 [&_ol]:ml-6 [&_ol]:list-decimal
                      [&_li]:mb-2 [&_li]:leading-relaxed
                      [&_blockquote]:border-l-4 [&_blockquote]:border-accent-red [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_blockquote]:bg-black/30
                      [&_hr]:border-occult-purple/30 [&_hr]:my-8
                      [&_a]:text-accent-red [&_a]:underline [&_a]:hover:text-red-400"
                    dangerouslySetInnerHTML={{ __html: postContent }}
                  />
                </article>
              )}

              {/* Decorative Footer Bar */}
              <div className="h-1 bg-gradient-to-r from-occult-purple via-accent-red to-occult-purple opacity-50" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
