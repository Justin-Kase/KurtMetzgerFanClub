'use client'

import { useEffect, useState } from 'react'
import type { TourDate } from '@/lib/types'

interface TourDatesProps {
  tourDates: TourDate[] // Fallback data
}

function getStatusLabel(status: TourDate['status']): string {
  switch (status) {
    case 'available': return 'Tickets Available'
    case 'sold-out':  return 'Sold Out'
    case 'presale':   return 'Presale'
  }
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export default function TourDates({ tourDates: fallbackDates }: TourDatesProps) {
  const [tourDates, setTourDates] = useState<TourDate[]>(fallbackDates)
  const [isLoading, setIsLoading] = useState(true)
  const [isScraped, setIsScraped] = useState(false)

  useEffect(() => {
    // Fetch live tour dates from scraper
    fetch('/api/tour-dates/scrape')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.dates && data.dates.length > 0) {
          // Deduplicate by date+venue+city
          const seen = new Set<string>()
          const uniqueDates = data.dates.filter((d: TourDate) => {
            const key = `${d.date}|${d.venue}|${d.city}`
            if (seen.has(key)) return false
            seen.add(key)
            return true
          })
          setTourDates(uniqueDates)
          setIsScraped(true)
        }
      })
      .catch(err => {
        console.warn('Failed to fetch live tour dates, using fallback:', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const today = new Date().toISOString().split('T')[0]
  
  const upcoming = [...tourDates]
    .filter((show) => show.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  return (
    <section id="tours" className="py-20" style={{ background: 'var(--color-dark-gray)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">
            <span className="text-accent-red mr-3">📅</span>
            TOUR DATES
          </h2>
          <p className="section-subtitle">
            Catch Kurt live on stage
            {isScraped && (
              <span className="ml-2 text-xs text-green-400">● Live from kurtmetzgercomedy.com</span>
            )}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-red mb-4"></div>
            <p className="text-gray-400">Loading latest tour dates...</p>
          </div>
        )}

        {/* Tour Dates List */}
        {!isLoading && upcoming.length === 0 && (
          <div
            className="text-center py-12 rounded-2xl border-2 border-dashed"
            style={{ background: 'var(--color-light-gray)', borderColor: 'var(--color-occult-purple)' }}
          >
            <div className="text-gray-500 text-5xl mb-4">📅</div>
            <h4 className="text-gray-400 text-xl mb-2" style={{ fontFamily: 'var(--font-oswald)' }}>
              No Upcoming Tour Dates
            </h4>
            <p className="text-gray-500">Check back soon for new show announcements!</p>
          </div>
        )}

        {!isLoading && upcoming.length > 0 && (
          <div>
            {upcoming.map((show, i) => {
              const isToday = show.date === today
              const isAvailable = show.status === 'available'
              const statusClass = `status-${show.status}`

              return (
                <div
                  key={show._id ?? `${show.date}-${i}`}
                  className={`tour-date ${isToday ? 'tour-date-today' : ''}`}
                  style={isAvailable ? { cursor: 'pointer' } : undefined}
                  onClick={
                    isAvailable
                      ? () => window.open(show.ticketUrl, '_blank', 'noopener,noreferrer')
                      : undefined
                  }
                  role={isAvailable ? 'link' : undefined}
                  tabIndex={isAvailable ? 0 : undefined}
                  onKeyDown={
                    isAvailable
                      ? (e) => {
                          if (e.key === 'Enter') window.open(show.ticketUrl, '_blank', 'noopener,noreferrer')
                        }
                      : undefined
                  }
                >
                  <div className="tour-date-info flex-1">
                    <h5>
                      {show.venue}
                      {isToday && (
                        <span
                          className="inline-block ml-2 text-sm px-2 py-0.5 rounded text-white"
                          style={{ background: 'var(--color-accent-red)', fontFamily: 'var(--font-oswald)' }}
                        >
                          TODAY
                        </span>
                      )}
                    </h5>
                    <p>
                      {show.city} &bull; {formatDate(show.date)}
                      {show.showTime && ` • ${show.showTime}`}
                      {show.price && ` • ${show.price}`}
                    </p>
                  </div>
                  <div className={statusClass}>{getStatusLabel(show.status)}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
