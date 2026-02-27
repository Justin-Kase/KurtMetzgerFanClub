# 🔥 Kurt Metzger Fanclub

> **Dark Comedy's Brightest Flame** ✨💀

An unofficial fansite celebrating the uncompromising comedy genius of Kurt Metzger. Built with Next.js 15, featuring live tour dates, blog articles, and YouTube integration.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

- **🏠 SANCTUM** - Hero section with rotating savage quotes
- **📅 TOUR DATES** - Live-scraped from [kurtmetzgercomedy.com](https://kurtmetzgercomedy.com/)
- **📜 PRESS** - Blog articles with markdown rendering and modal viewer
- **🤪 DERP** - Latest YouTube videos/streams via YouTube Data API
- **✉ JOIN CULT** - Newsletter signup with occult theming
- **🎨 Dark Occult Aesthetic** - Pentagrams, mystical symbols, red/purple glow effects
- **📱 Fully Responsive** - Mobile-first design with smooth animations

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI:** [React 19](https://react.dev/) + [TailwindCSS 4](https://tailwindcss.com/)
- **Language:** [TypeScript 5.7](https://www.typescriptlang.org/)
- **CMS:** [Sanity](https://www.sanity.io/) (optional, has fallback data)
- **Markdown:** [marked](https://marked.js.org/)
- **APIs:** YouTube Data API v3, Web scraping with cheerio
- **Deployment:** [Vercel](https://vercel.com/) (recommended)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (tested with v25.6.1)
- npm or yarn
- YouTube Data API key (optional, for DERP section)

### Installation

```bash
# Clone the repo
git clone https://github.com/Justin-Kase/KurtMetzgerFanClub.git
cd KurtMetzgerFanClub

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your YouTube API key to .env.local
# YOUTUBE_API_KEY=your_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Environment Variables

Create `.env.local` in the project root:

```bash
# YouTube Data API (required for DERP section)
YOUTUBE_API_KEY=your_youtube_api_key_here

# Sanity CMS (optional - uses fallback data if not configured)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Getting a YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **YouTube Data API v3**
4. Create credentials → API Key
5. Copy the key to `.env.local`

## 📁 Project Structure

```
KurtMetzgerFanClub/
├── public/
│   ├── blog/              # Markdown blog articles
│   └── images/            # Static assets (pentagrams, logos, etc.)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── blog/[slug]/        # Blog post API
│   │   │   ├── tour-dates/scrape/  # Live tour date scraper
│   │   │   └── youtube/            # YouTube API routes
│   │   ├── globals.css   # TailwindCSS + custom occult styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/        # React components
│   ├── lib/
│   │   ├── data.ts       # Fallback static data
│   │   ├── sanity.ts     # Sanity CMS client
│   │   └── types.ts      # TypeScript types
│   └── sanity/           # Sanity schema definitions
├── .env.example          # Environment variable template
├── next.config.ts        # Next.js configuration
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Key Components

- **HeroSection** - Animated landing with rotating quotes
- **TourDates** - Dynamic tour date loading with click-to-buy
- **BlogSection** - Article grid with modal markdown viewer
- **DerpSection** - YouTube video grid with category filtering
- **Newsletter** - Email signup with occult ritual theming
- **OccultDecorations** - Floating pentagrams and mystical symbols

## 🔧 Development

```bash
# Run dev server
npm run dev

# Type check
npm run type-check

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Justin-Kase/KurtMetzgerFanClub)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - `YOUTUBE_API_KEY`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` (optional)
   - `NEXT_PUBLIC_SANITY_DATASET` (optional)
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## 📝 Adding Content

### Blog Posts

1. Create markdown file in `public/blog/your-post-slug.md`
2. Add entry to `src/lib/data.ts` → `sampleBlogPosts` array
3. Include title, excerpt, date, readTime, slug, and imageUrl

### Tour Dates

Tour dates are **automatically scraped** from kurtmetzgercomedy.com on page load.

Fallback dates in `src/lib/data.ts` → `fallbackTourDates` (used if scraping fails).

## 🎭 Features Breakdown

### Dynamic Tour Dates
- Scrapes https://kurtmetzgercomedy.com/ on each page load
- 1-hour cache to avoid excessive requests
- Falls back to hardcoded dates if scraping fails
- Click any date to open ticket purchase page

### YouTube Integration
- Fetches latest videos via YouTube Data API v3
- Categories: Podcasts, Jimmy Dore, Specials
- Modal video player with autoplay
- 1-hour cache on all API calls

### Blog System
- Markdown articles stored in `/public/blog/`
- Modal viewer with syntax-highlighted rendering
- Unsplash thumbnails for visual appeal
- Responsive grid layout

## 🎨 Customization

### Colors

Edit CSS custom properties in `src/app/globals.css`:

```css
:root {
  --color-primary-black: #1a1a1a;
  --color-dark-gray: #2a2a2a;
  --color-accent-red: #dc3545;
  --color-occult-purple: #8a2be2;
}
```

### Fonts

- Headers: [Oswald](https://fonts.google.com/specimen/Oswald) (bold, uppercase)
- Body: [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) (monospace)

## 🐛 Known Issues

- Tour date scraping depends on kurtmetzgercomedy.com HTML structure (may break if site updates)
- YouTube API has daily quota limits (10,000 requests/day for free tier)
- Sanity CMS is optional but requires setup for production data

## 📜 License

This is an **unofficial fansite** and is not affiliated with Kurt Metzger or his management.

All content, quotes, and videos belong to their respective owners.

## 🔗 Links

- **Official Website:** [kurtmetzgercomedy.com](https://kurtmetzgercomedy.com/)
- **YouTube:** [@kurtmetzgercomedy](https://www.youtube.com/@kurtmetzgercomedy)
- **Twitter/X:** [@kurtmetzger](https://twitter.com/kurtmetzger)
- **Wikipedia:** [Kurt Metzger](https://en.wikipedia.org/wiki/Kurt_Metzger)

## 🙏 Credits

Built with 🖤 by the fanclub for the fanclub.

Dark occult aesthetic inspired by Kurt's uncompromising comedic philosophy.

---

**"I don't apologize for being right. I apologize for you being wrong."** — Kurt Metzger

💀🔥⚡
