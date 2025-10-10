'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import VermogenswinstTemplate from '@/components/VermogenswinstTemplate'
import { getTuningData, CarInfo } from '@/services/tuningData'

export default function VermogenswinstDynamicPage() {
  const params = useParams()
  const [selectedCar, setSelectedCar] = useState<CarInfo>({
    brand: '',
    model: '',
    generation: '',
    engine: ''
  })
  const [isClient, setIsClient] = useState(false)

  // Function to decode URL slugs back to readable format
  const decodeSlug = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Function to decode generation slug (special handling for year ranges)
  const decodeGenerationSlug = (slug: string) => {
    // Handle patterns like "8y-2020-heden" -> "8Y (2020-heden)"
    if (slug.includes('-heden')) {
      const parts = slug.split('-')
      const generation = parts[0].toUpperCase()
      const yearRange = parts.slice(1).join('-')
      return `${generation} (${yearRange})`
    }
    
    // Handle patterns like "g20-2019-2023" -> "G20 (2019-2023)"
    if (slug.match(/^[a-z]\d+-\d{4}-\d{4}$/)) {
      const parts = slug.split('-')
      const generation = parts[0].toUpperCase()
      const yearRange = `${parts[1]}-${parts[2]}`
      return `${generation} (${yearRange})`
    }
    
    // Handle patterns like "w205-2014-2021" -> "W205 (2014-2021)"
    if (slug.match(/^[a-z]\d+-\d{4}-\d{4}$/)) {
      const parts = slug.split('-')
      const generation = parts[0].toUpperCase()
      const yearRange = `${parts[1]}-${parts[2]}`
      return `${generation} (${yearRange})`
    }
    
    // Handle patterns like "mk8-2019-heden" -> "Mk8 (2019-heden)"
    if (slug.match(/^mk\d+-\d{4}-heden$/)) {
      const parts = slug.split('-')
      const generation = parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
      const yearRange = `${parts[1]}-${parts[2]}`
      return `${generation} (${yearRange})`
    }
    
    // Handle patterns like "992-2019-heden" -> "992 (2019-heden)"
    if (slug.match(/^\d{3}-\d{4}-heden$/)) {
      const parts = slug.split('-')
      const generation = parts[0]
      const yearRange = `${parts[1]}-${parts[2]}`
      return `${generation} (${yearRange})`
    }
    
    // Fallback to regular decodeSlug
    return decodeSlug(slug)
  }

  // Function to decode engine slug (more complex due to numbers and special chars)
  const decodeEngineSlug = (slug: string) => {
    // Handle common patterns - more specific patterns first
    const patterns = [
      // Handle both formats: 10-tfsi-110pk and 1-0-tfsi-110pk
      { pattern: /^(\d)(\d)-tfsi-(\d+)pk$/, replacement: '$1.$2 TFSI ($3pk)' },
      { pattern: /^(\d+)-(\d+)-tfsi-(\d+)pk$/, replacement: '$1.$2 TFSI ($3pk)' },
      { pattern: /^(\d)(\d)-tsi-(\d+)pk$/, replacement: '$1.$2 TSI ($3pk)' },
      { pattern: /^(\d+)-(\d+)-tsi-(\d+)pk$/, replacement: '$1.$2 TSI ($3pk)' },
      { pattern: /^(\d)(\d)-tdi-(\d+)pk$/, replacement: '$1.$2 TDI ($3pk)' },
      { pattern: /^(\d+)-(\d+)-tdi-(\d+)pk$/, replacement: '$1.$2 TDI ($3pk)' },
      { pattern: /^(\d+)-(\d+)-carrera-(\d+)pk$/, replacement: '$1.$2 Carrera ($3pk)' },
      { pattern: /^(\d+)-(\d+)i-(\d+)pk$/, replacement: '$1.$2i ($3pk)' },
      { pattern: /^(\d+)-(\d+)d-(\d+)pk$/, replacement: '$1.$2d ($3pk)' },
      { pattern: /^(\d+)-(\d+)-(\d+)pk$/, replacement: '$1.$2 ($3pk)' }
    ]
    
    for (const { pattern, replacement } of patterns) {
      if (pattern.test(slug)) {
        return slug.replace(pattern, replacement)
      }
    }
    
    // Fallback: capitalize words
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && params.brand && params.model && params.generation && params.engine) {
      const decodedCar = {
        brand: decodeSlug(params.brand as string),
        model: decodeSlug(params.model as string),
        generation: decodeGenerationSlug(params.generation as string),
        engine: decodeEngineSlug(params.engine as string)
      }
      
      setSelectedCar(decodedCar)
    }
  }, [isClient, params])

  // Get tuning data from centralized service
  const currentTuning = getTuningData(selectedCar)

  const [isLoading, setIsLoading] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  const handleRequestQuote = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowContactForm(true)
    }, 1000)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Offerte aanvraag verzonden! We nemen binnen 24 uur contact met u op.')
    setShowContactForm(false)
  }

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-white">Laden...</p>
        </div>
      </div>
    )
  }

  if (!selectedCar.brand || !currentTuning) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Geen tuning data gevonden</h1>
          <p className="text-secondary-400 mb-6">Voor deze auto hebben we nog geen tuning data beschikbaar.</p>
          <Link href="/" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors">
            Terug naar Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <VermogenswinstTemplate
      carInfo={selectedCar}
      tuningData={currentTuning}
      onRequestQuote={handleRequestQuote}
      isLoading={isLoading}
      showContactForm={showContactForm}
      onCloseContactForm={() => setShowContactForm(false)}
      onSubmitContactForm={handleContactSubmit}
    />
  )
}
