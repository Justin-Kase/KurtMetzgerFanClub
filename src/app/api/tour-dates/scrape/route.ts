/**
 * Tour Dates Scraper API Route
 * Fetches and parses tour dates from kurtmetzgercomedy.com
 * Called by TourDates component on page load
 */

import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

const TOUR_URL = 'https://kurtmetzgercomedy.com/'

interface TourDateEntry {
  date: string
  venue: string
  city: string
  ticketUrl: string
  status: 'available' | 'sold-out' | 'presale'
  price?: string
  showTime?: string
}

/**
 * Parse date like "February 27" to ISO format
 */
function parseDate(rawDate: string): string {
  const currentYear = new Date().getFullYear()
  const cleanDate = rawDate.replace(/(\d+)(st|nd|rd|th)/, '$1')
  
  try {
    const parsed = new Date(`${cleanDate}, ${currentYear}`)
    if (isNaN(parsed.getTime())) {
      // Try next year if date already passed
      const nextYearDate = new Date(`${cleanDate}, ${currentYear + 1}`)
      return nextYearDate.toISOString().split('T')[0]
    }
    return parsed.toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}

export async function GET() {
  try {
    const response = await fetch(TOUR_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; KurtMetzgerFanClub/1.0)'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const html = await response.text()
    const $ = cheerio.load(html)
    const dates: TourDateEntry[] = []
    
    // Parse tour dates from the HTML structure
    // Look for the TOUR DATES section and extract date, venue, city, ticket link
    let inTourSection = false
    
    $('h3, a').each((_, elem) => {
      const $elem = $(elem)
      const text = $elem.text().trim()
      
      if (text === 'TOUR DATES') {
        inTourSection = true
        return
      }
      
      if (text === 'CLIPS' || text === 'PHOTOS' || text === 'PRESS') {
        inTourSection = false
        return
      }
    })
    
    // Try to find tour date containers
    // Structure varies, so we'll look for common patterns
    const tourContainers = $('.about-agileinfo').find('div').filter((_, elem) => {
      const text = $(elem).text()
      return /february|march|april|may|june|july|august|september|october|november|december/i.test(text) &&
             /tickets/i.test(text)
    })
    
    tourContainers.each((_, container) => {
      const $container = $(container)
      const headings = $container.find('h3')
      const link = $container.find('a[href]')
      
      if (headings.length >= 3 && link.length > 0) {
        const rawDate = headings.eq(0).text().trim()
        const venue = headings.eq(1).text().trim()
        const city = headings.eq(2).text().trim()
        const ticketUrl = link.attr('href')?.trim()
        
        if (rawDate && venue && city && ticketUrl) {
          dates.push({
            date: parseDate(rawDate),
            venue,
            city,
            ticketUrl,
            status: 'available',
            showTime: '8:00 PM', // Default, could be parsed if available
          })
        }
      }
    })
    
    // If no dates found via container method, try direct h3 sequence
    if (dates.length === 0) {
      const allH3s = $('h3').toArray()
      
      for (let i = 0; i < allH3s.length - 2; i++) {
        const rawDate = $(allH3s[i]).text().trim()
        const venue = $(allH3s[i + 1]).text().trim()
        const city = $(allH3s[i + 2]).text().trim()
        
        // Check if this looks like a date
        if (/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}/i.test(rawDate)) {
          // Find the next ticket link
          let ticketUrl = ''
          const $nextLink = $(allH3s[i + 2]).nextAll('a').first()
          
          if ($nextLink.text().toLowerCase().includes('ticket')) {
            ticketUrl = $nextLink.attr('href') || ''
          }
          
          if (ticketUrl) {
            dates.push({
              date: parseDate(rawDate),
              venue,
              city,
              ticketUrl,
              status: 'available',
              showTime: '8:00 PM',
            })
          }
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      dates,
      scrapedAt: new Date().toISOString(),
      source: TOUR_URL
    })
    
  } catch (err) {
    console.error('Tour date scraping error:', err)
    
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
      dates: [] // Return empty, component will use fallback
    }, { status: 200 }) // Return 200 so component can handle gracefully
  }
}
