'use client'

import { useState } from 'react'
import { ExternalLink, Eye, Search, Globe, TrendingUp, Users, MapPin, X, Star } from 'lucide-react'

// SEO landingspagina data
const seoPages = [
  // Hoofdsteden
  {
    id: 1,
    city: 'Assen',
    province: 'Drenthe',
    population: '67.500',
    url: '/chiptuning/assen',
    status: 'Actief',
    views: 1247,
    conversions: 23,
    lastUpdated: '2024-01-15',
    keywords: ['chiptuning Assen', 'vermogenswinst Assen', 'auto tuning Assen', 'BMW chiptuning Assen'],
    description: 'Professionele chiptuning in Assen door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    seoScore: 94,
    type: 'Hoofdstad'
  },
  {
    id: 2,
    city: 'Emmen',
    province: 'Drenthe',
    population: '107.000',
    url: '/chiptuning/emmen',
    status: 'Actief',
    views: 2156,
    conversions: 34,
    lastUpdated: '2024-01-14',
    keywords: ['chiptuning Emmen', 'auto tuning Emmen', 'vermogenswinst Emmen', 'Volkswagen tuning Emmen'],
    description: 'Betrouwbare chiptuning in Emmen. Verhoog vermogen en bespaar brandstof met professionele tuning. BMW, Audi, Mercedes, Volkswagen tuning.',
    seoScore: 92,
    type: 'Hoofdstad'
  },
  {
    id: 3,
    city: 'Hoogeveen',
    province: 'Drenthe',
    population: '55.000',
    url: '/chiptuning/hoogeveen',
    status: 'Actief',
    views: 892,
    conversions: 18,
    lastUpdated: '2024-01-13',
    keywords: ['chiptuning Hoogeveen', 'auto tuning Hoogeveen', 'vermogenswinst Hoogeveen', 'BMW chiptuning Hoogeveen'],
    description: 'Professionele chiptuning in Hoogeveen. Verhoog het vermogen van uw auto met 25-35%. BMW, Audi, Mercedes tuning. Gratis diagnose.',
    seoScore: 91,
    type: 'Hoofdstad'
  },
  {
    id: 4,
    city: 'Meppel',
    province: 'Drenthe',
    population: '34.000',
    url: '/chiptuning/meppel',
    status: 'Actief',
    views: 654,
    conversions: 12,
    lastUpdated: '2024-01-12',
    keywords: ['chiptuning Meppel', 'auto tuning Meppel', 'vermogenswinst Meppel', 'BMW chiptuning Meppel'],
    description: 'Betrouwbare chiptuning in Meppel. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes, Volkswagen tuning. 2 jaar garantie.',
    seoScore: 93,
    type: 'Hoofdstad'
  },
  {
    id: 5,
    city: 'Coevorden',
    province: 'Drenthe',
    population: '36.000',
    url: '/chiptuning/coevorden',
    status: 'Actief',
    views: 743,
    conversions: 15,
    lastUpdated: '2024-01-11',
    keywords: ['chiptuning Coevorden', 'auto tuning Coevorden', 'vermogenswinst Coevorden', 'BMW chiptuning Coevorden'],
    description: 'Professionele chiptuning in Coevorden. Verhoog het vermogen van uw auto met 20-30%. BMW, Audi, Mercedes tuning. 2 jaar garantie.',
    seoScore: 95,
    type: 'Hoofdstad'
  },
  // Servicegebieden Assen
  {
    id: 6,
    city: 'Roden',
    province: 'Drenthe',
    population: '15.200',
    url: '/chiptuning/roden',
    status: 'Actief',
    views: 342,
    conversions: 8,
    lastUpdated: '2024-01-10',
    keywords: ['chiptuning Roden', 'auto tuning Roden', 'vermogenswinst Roden', 'BMW chiptuning Roden'],
    description: 'Professionele chiptuning in Roden. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie. Service vanuit Assen.',
    seoScore: 89,
    type: 'Servicegebied'
  },
  {
    id: 7,
    city: 'Norg',
    province: 'Drenthe',
    population: '3.800',
    url: '/chiptuning/norg',
    status: 'Actief',
    views: 187,
    conversions: 4,
    lastUpdated: '2024-01-09',
    keywords: ['chiptuning Norg', 'auto tuning Norg', 'vermogenswinst Norg', 'BMW chiptuning Norg'],
    description: 'Betrouwbare chiptuning in Norg. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Assen.',
    seoScore: 87,
    type: 'Servicegebied'
  },
  {
    id: 8,
    city: 'Peelo',
    province: 'Drenthe',
    population: '2.100',
    url: '/chiptuning/peelo',
    status: 'Actief',
    views: 156,
    conversions: 3,
    lastUpdated: '2024-01-08',
    keywords: ['chiptuning Peelo', 'auto tuning Peelo', 'vermogenswinst Peelo', 'BMW chiptuning Peelo'],
    description: 'Professionele chiptuning in Peelo. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    seoScore: 86,
    type: 'Servicegebied'
  },
  {
    id: 9,
    city: 'Ubbena',
    province: 'Drenthe',
    population: '1.800',
    url: '/chiptuning/ubbena',
    status: 'Actief',
    views: 134,
    conversions: 3,
    lastUpdated: '2024-01-07',
    keywords: ['chiptuning Ubbena', 'auto tuning Ubbena', 'vermogenswinst Ubbena', 'BMW chiptuning Ubbena'],
    description: 'Betrouwbare chiptuning in Ubbena. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Assen.',
    seoScore: 85,
    type: 'Servicegebied'
  },
  {
    id: 10,
    city: 'Loon',
    province: 'Drenthe',
    population: '1.200',
    url: '/chiptuning/loon',
    status: 'Actief',
    views: 98,
    conversions: 2,
    lastUpdated: '2024-01-06',
    keywords: ['chiptuning Loon', 'auto tuning Loon', 'vermogenswinst Loon', 'BMW chiptuning Loon'],
    description: 'Professionele chiptuning in Loon. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    seoScore: 84,
    type: 'Servicegebied'
  },
  // Servicegebieden Emmen
  {
    id: 11,
    city: 'Klazienaveen',
    province: 'Drenthe',
    population: '8.900',
    url: '/chiptuning/klazienaveen',
    status: 'Actief',
    views: 267,
    conversions: 6,
    lastUpdated: '2024-01-05',
    keywords: ['chiptuning Klazienaveen', 'auto tuning Klazienaveen', 'vermogenswinst Klazienaveen', 'BMW chiptuning Klazienaveen'],
    description: 'Betrouwbare chiptuning in Klazienaveen. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Emmen.',
    seoScore: 88,
    type: 'Servicegebied'
  },
  {
    id: 12,
    city: 'Nieuw-Amsterdam',
    province: 'Drenthe',
    population: '5.400',
    url: '/chiptuning/nieuw-amsterdam',
    status: 'Actief',
    views: 198,
    conversions: 5,
    lastUpdated: '2024-01-04',
    keywords: ['chiptuning Nieuw-Amsterdam', 'auto tuning Nieuw-Amsterdam', 'vermogenswinst Nieuw-Amsterdam', 'BMW chiptuning Nieuw-Amsterdam'],
    description: 'Professionele chiptuning in Nieuw-Amsterdam. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    seoScore: 87,
    type: 'Servicegebied'
  },
  {
    id: 13,
    city: 'Erica',
    province: 'Drenthe',
    population: '4.700',
    url: '/chiptuning/erica',
    status: 'Actief',
    views: 176,
    conversions: 4,
    lastUpdated: '2024-01-03',
    keywords: ['chiptuning Erica', 'auto tuning Erica', 'vermogenswinst Erica', 'BMW chiptuning Erica'],
    description: 'Betrouwbare chiptuning in Erica. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Emmen.',
    seoScore: 86,
    type: 'Servicegebied'
  },
  // Servicegebieden Hoogeveen
  {
    id: 14,
    city: 'Pesse',
    province: 'Drenthe',
    population: '2.300',
    url: '/chiptuning/pesse',
    status: 'Actief',
    views: 145,
    conversions: 3,
    lastUpdated: '2024-01-02',
    keywords: ['chiptuning Pesse', 'auto tuning Pesse', 'vermogenswinst Pesse', 'BMW chiptuning Pesse'],
    description: 'Professionele chiptuning in Pesse. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    seoScore: 85,
    type: 'Servicegebied'
  },
  {
    id: 15,
    city: 'Noordscheschut',
    province: 'Drenthe',
    population: '1.900',
    url: '/chiptuning/noordscheschut',
    status: 'Actief',
    views: 123,
    conversions: 3,
    lastUpdated: '2024-01-01',
    keywords: ['chiptuning Noordscheschut', 'auto tuning Noordscheschut', 'vermogenswinst Noordscheschut', 'BMW chiptuning Noordscheschut'],
    description: 'Betrouwbare chiptuning in Noordscheschut. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Hoogeveen.',
    seoScore: 84,
    type: 'Servicegebied'
  },
  // Servicegebieden Meppel
  {
    id: 16,
    city: 'Nijeveen',
    province: 'Drenthe',
    population: '2.800',
    url: '/chiptuning/nijeveen',
    status: 'Actief',
    views: 167,
    conversions: 4,
    lastUpdated: '2023-12-31',
    keywords: ['chiptuning Nijeveen', 'auto tuning Nijeveen', 'vermogenswinst Nijeveen', 'BMW chiptuning Nijeveen'],
    description: 'Professionele chiptuning in Nijeveen. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    seoScore: 86,
    type: 'Servicegebied'
  },
  {
    id: 17,
    city: 'De Wijk',
    province: 'Drenthe',
    population: '2.400',
    url: '/chiptuning/de-wijk',
    status: 'Actief',
    views: 154,
    conversions: 3,
    lastUpdated: '2023-12-30',
    keywords: ['chiptuning De Wijk', 'auto tuning De Wijk', 'vermogenswinst De Wijk', 'BMW chiptuning De Wijk'],
    description: 'Betrouwbare chiptuning in De Wijk. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Meppel.',
    seoScore: 85,
    type: 'Servicegebied'
  },
  // Servicegebieden Coevorden
  {
    id: 18,
    city: 'Sleen',
    province: 'Drenthe',
    population: '2.100',
    url: '/chiptuning/sleen',
    status: 'Actief',
    views: 142,
    conversions: 3,
    lastUpdated: '2023-12-29',
    keywords: ['chiptuning Sleen', 'auto tuning Sleen', 'vermogenswinst Sleen', 'BMW chiptuning Sleen'],
    description: 'Professionele chiptuning in Sleen. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    seoScore: 86,
    type: 'Servicegebied'
  },
  {
    id: 19,
    city: 'Oosterhesselen',
    province: 'Drenthe',
    population: '1.600',
    url: '/chiptuning/oosterhesselen',
    status: 'Actief',
    views: 128,
    conversions: 3,
    lastUpdated: '2023-12-28',
    keywords: ['chiptuning Oosterhesselen', 'auto tuning Oosterhesselen', 'vermogenswinst Oosterhesselen', 'BMW chiptuning Oosterhesselen'],
    description: 'Betrouwbare chiptuning in Oosterhesselen. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Coevorden.',
    seoScore: 85,
    type: 'Servicegebied'
  },
  {
    id: 20,
    city: 'Zwinderen',
    province: 'Drenthe',
    population: '1.100',
    url: '/chiptuning/zwinderen',
    status: 'Actief',
    views: 98,
    conversions: 2,
    lastUpdated: '2023-12-27',
    keywords: ['chiptuning Zwinderen', 'auto tuning Zwinderen', 'vermogenswinst Zwinderen', 'BMW chiptuning Zwinderen'],
    description: 'Professionele chiptuning in Zwinderen. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    seoScore: 84,
    type: 'Servicegebied'
  }
]

export default function SeoAiPage() {
  const [selectedPage, setSelectedPage] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const handleViewPage = (page: any) => {
    setSelectedPage(page)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPage(null)
  }

  const totalViews = seoPages.reduce((sum, page) => sum + page.views, 0)
  const totalConversions = seoPages.reduce((sum, page) => sum + page.conversions, 0)
  const conversionRate = ((totalConversions / totalViews) * 100).toFixed(1)
  const averageSeoScore = Math.round(seoPages.reduce((sum, page) => sum + page.seoScore, 0) / seoPages.length)
  const hoofdstedenCount = seoPages.filter(page => page.type === 'Hoofdstad').length
  const servicegebiedenCount = seoPages.filter(page => page.type === 'Servicegebied').length

  return (
    <div className="p-6 bg-dark-950 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">SEO AI</h1>
        <p className="text-secondary-300">Beheer en monitor uw SEO landingspagina's</p>
        <div className="flex items-center space-x-4 mt-2">
          <span className="text-sm text-blue-400">5 Hoofdsteden</span>
          <span className="text-sm text-secondary-400">•</span>
          <span className="text-sm text-purple-400">15 Servicegebieden</span>
          <span className="text-sm text-secondary-400">•</span>
          <span className="text-sm text-secondary-300">20 Totaal</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-dark-800 border border-dark-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-400 text-sm font-medium">Totaal Pagina's</p>
              <p className="text-2xl font-bold text-white">{seoPages.length}</p>
            </div>
            <div className="bg-primary-500/10 p-3 rounded-lg">
              <Globe className="h-6 w-6 text-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-400 text-sm font-medium">Totaal Weergaven</p>
              <p className="text-2xl font-bold text-white">{totalViews.toLocaleString()}</p>
            </div>
            <div className="bg-primary-500/10 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-400 text-sm font-medium">Conversies</p>
              <p className="text-2xl font-bold text-white">{totalConversions}</p>
            </div>
            <div className="bg-primary-500/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-400 text-sm font-medium">Conversie Rate</p>
              <p className="text-2xl font-bold text-white">{conversionRate}%</p>
            </div>
            <div className="bg-primary-500/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-400 text-sm font-medium">Gem. SEO Score</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-green-400">{averageSeoScore}/100</p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(averageSeoScore / 20) 
                          ? 'text-green-400 fill-current' 
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <Star className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Landingspagina's Tabel */}
      <div className="bg-dark-800 border border-dark-700/50 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-700/50">
          <h2 className="text-xl font-semibold text-white">SEO Landingspagina's</h2>
          <p className="text-secondary-400 text-sm">Overzicht van alle gecreëerde landingspagina's</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                  Stad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                  Bevolking
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                  Weergaven
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                  Conversies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                  SEO Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                  Laatste Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                  Acties
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/50">
              {seoPages.map((page) => (
                <tr key={page.id} className="hover:bg-dark-700/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-primary-500/10 p-2 rounded-lg mr-3">
                        <MapPin className="h-4 w-4 text-primary-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{page.city}</div>
                        <div className="text-sm text-secondary-400">{page.province}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      page.type === 'Hoofdstad' 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {page.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{page.population}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{page.views.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{page.conversions}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(page.seoScore / 20) 
                                ? 'text-green-400 fill-current' 
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-green-400">{page.seoScore}/100</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-400">{page.lastUpdated}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewPage(page)}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Bekijk</span>
                      </button>
                      <a
                        href={page.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-dark-700 hover:bg-dark-600 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Open</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal voor pagina details */}
      {showModal && selectedPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-800 border border-dark-700/50 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Landingspagina Details</h3>
              <button
                onClick={closeModal}
                className="text-secondary-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Stad Info */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Stad Informatie</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-secondary-400">Stad</p>
                    <p className="text-white font-medium">{selectedPage.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-400">Provincie</p>
                    <p className="text-white font-medium">{selectedPage.province}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-400">Type</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedPage.type === 'Hoofdstad' 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {selectedPage.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-400">Bevolking</p>
                    <p className="text-white font-medium">{selectedPage.population}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-400">Status</p>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      {selectedPage.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Performance</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-secondary-400">Weergaven</p>
                    <p className="text-white font-medium">{selectedPage.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-400">Conversies</p>
                    <p className="text-white font-medium">{selectedPage.conversions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-400">Conversie Rate</p>
                    <p className="text-white font-medium">{((selectedPage.conversions / selectedPage.views) * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-400">SEO Score</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(selectedPage.seoScore / 20) 
                                ? 'text-green-400 fill-current' 
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-green-400 font-medium">{selectedPage.seoScore}/100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO Info */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">SEO Informatie</h4>
                <div>
                  <p className="text-sm text-secondary-400 mb-2">Keywords</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPage.keywords.map((keyword: string, index: number) => (
                      <span key={index} className="bg-primary-500/10 text-primary-400 px-2 py-1 rounded text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-secondary-400 mb-2">Description</p>
                  <p className="text-white text-sm">{selectedPage.description}</p>
                </div>
              </div>

              {/* Acties */}
              <div className="flex space-x-3 pt-4 border-t border-dark-700/50">
                <a
                  href={selectedPage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-center transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Bekijk Landingspagina</span>
                </a>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
                >
                  Sluiten
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
