'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Car, Users, Activity, Download, Filter, Calendar, Search, Eye, FileText, PieChart, LineChart, X, Star, Target, Zap, Clock, CheckCircle } from 'lucide-react'

const initialMaandelijkseData = [
  { maand: 'Jan', tunings: 45, omzet: 12500, klanten: 38, gemiddeldeGain: 28, tevredenheid: 4.7 },
  { maand: 'Feb', tunings: 52, omzet: 14200, klanten: 42, gemiddeldeGain: 29, tevredenheid: 4.8 },
  { maand: 'Mar', tunings: 48, omzet: 13100, klanten: 39, gemiddeldeGain: 27, tevredenheid: 4.6 },
  { maand: 'Apr', tunings: 61, omzet: 16800, klanten: 51, gemiddeldeGain: 31, tevredenheid: 4.9 },
  { maand: 'Mei', tunings: 55, omzet: 15200, klanten: 45, gemiddeldeGain: 30, tevredenheid: 4.8 },
  { maand: 'Jun', tunings: 67, omzet: 18500, klanten: 58, gemiddeldeGain: 32, tevredenheid: 4.9 },
  { maand: 'Jul', tunings: 58, omzet: 16200, klanten: 49, gemiddeldeGain: 29, tevredenheid: 4.7 },
  { maand: 'Aug', tunings: 63, omzet: 17500, klanten: 53, gemiddeldeGain: 31, tevredenheid: 4.8 },
  { maand: 'Sep', tunings: 71, omzet: 19800, klanten: 61, gemiddeldeGain: 33, tevredenheid: 4.9 },
  { maand: 'Okt', tunings: 65, omzet: 18200, klanten: 56, gemiddeldeGain: 30, tevredenheid: 4.8 },
  { maand: 'Nov', tunings: 59, omzet: 16500, klanten: 50, gemiddeldeGain: 29, tevredenheid: 4.7 },
  { maand: 'Dec', tunings: 73, omzet: 20500, klanten: 64, gemiddeldeGain: 34, tevredenheid: 4.9 }
]

const initialTopVoertuigen = [
  { id: 1, merk: 'BMW', model: '320d', aantal: 23, gemiddeldeGain: 28, omzet: 10350, tevredenheid: 4.8, populariteit: 'Hoog' },
  { id: 2, merk: 'Audi', model: 'A4 2.0 TDI', aantal: 18, gemiddeldeGain: 32, omzet: 8100, tevredenheid: 4.9, populariteit: 'Hoog' },
  { id: 3, merk: 'Volkswagen', model: 'Golf GTI', aantal: 15, gemiddeldeGain: 35, omzet: 6750, tevredenheid: 4.7, populariteit: 'Gemiddeld' },
  { id: 4, merk: 'Mercedes', model: 'C200', aantal: 12, gemiddeldeGain: 25, omzet: 5400, tevredenheid: 4.6, populariteit: 'Gemiddeld' },
  { id: 5, merk: 'Volvo', model: 'V60 D4', aantal: 9, gemiddeldeGain: 22, omzet: 4050, tevredenheid: 4.8, populariteit: 'Laag' },
  { id: 6, merk: 'Ford', model: 'Focus ST', aantal: 8, gemiddeldeGain: 30, omzet: 3600, tevredenheid: 4.5, populariteit: 'Laag' },
  { id: 7, merk: 'Seat', model: 'Leon FR', aantal: 7, gemiddeldeGain: 27, omzet: 3150, tevredenheid: 4.7, populariteit: 'Laag' },
  { id: 8, merk: 'Skoda', model: 'Octavia RS', aantal: 6, gemiddeldeGain: 26, omzet: 2700, tevredenheid: 4.6, populariteit: 'Laag' }
]

const initialTuningTypes = [
  { type: 'Stage 1', percentage: 45, aantal: 148, gemiddeldeGain: 25, gemiddeldeKosten: 450, tevredenheid: 4.8 },
  { type: 'Stage 2', percentage: 30, aantal: 98, gemiddeldeGain: 35, gemiddeldeKosten: 750, tevredenheid: 4.9 },
  { type: 'ECU Tuning', percentage: 25, aantal: 82, gemiddeldeGain: 30, gemiddeldeKosten: 550, tevredenheid: 4.7 }
]

const initialKlantReviews = [
  { id: 1, klant: 'Jan Jansen', voertuig: 'BMW 320d', rating: 5, review: 'Uitstekende service! Mijn auto rijdt nu veel beter.', datum: '2024-01-15', type: 'Stage 1' },
  { id: 2, klant: 'Piet de Vries', voertuig: 'Audi A4', rating: 5, review: 'Professioneel werk, zeer tevreden met het resultaat.', datum: '2024-01-12', type: 'Stage 2' },
  { id: 3, klant: 'Klaas Bakker', voertuig: 'VW Golf GTI', rating: 4, review: 'Goede tuning, auto voelt veel sportiever aan.', datum: '2024-01-10', type: 'ECU Tuning' },
  { id: 4, klant: 'Marieke Smit', voertuig: 'Mercedes C200', rating: 5, review: 'Fantastisch resultaat, zeker een aanrader!', datum: '2024-01-08', type: 'Stage 1' },
  { id: 5, klant: 'Hans Visser', voertuig: 'Volvo V60', rating: 4, review: 'Netjes werk, auto rijdt soepeler.', datum: '2024-01-05', type: 'Stage 1' }
]

const performanceStats = [
  {
    title: 'Totaal Tunings',
    value: '328',
    change: '+12%',
    trend: 'up',
    icon: Car,
    color: 'text-blue-500',
    detail: 'Dit jaar'
  },
  {
    title: 'Maandelijkse Omzet',
    value: '€18,500',
    change: '+8%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-500',
    detail: 'Gemiddeld'
  },
  {
    title: 'Nieuwe Klanten',
    value: '58',
    change: '+15%',
    trend: 'up',
    icon: Users,
    color: 'text-orange-500',
    detail: 'Deze maand'
  },
  {
    title: 'Gemiddelde Power Gain',
    value: '+28%',
    change: '+2%',
    trend: 'up',
    icon: Activity,
    color: 'text-purple-500',
    detail: 'Alle tunings'
  }
]

export default function RapportenPage() {
  const [maandelijkseData, setMaandelijkseData] = useState(initialMaandelijkseData)
  const [topVoertuigen, setTopVoertuigen] = useState(initialTopVoertuigen)
  const [tuningTypes, setTuningTypes] = useState(initialTuningTypes)
  const [klantReviews, setKlantReviews] = useState(initialKlantReviews)
  const [selectedPeriod, setSelectedPeriod] = useState('6m')
  const [selectedMetric, setSelectedMetric] = useState('tunings')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVoertuig, setSelectedVoertuig] = useState<typeof topVoertuigen[0] | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Filter data based on selected period
  const getFilteredData = () => {
    const periods = {
      '3m': 3,
      '6m': 6,
      '12m': 12
    }
    const months = periods[selectedPeriod as keyof typeof periods] || 6
    return maandelijkseData.slice(-months)
  }

  const filteredData = getFilteredData()

  // Calculate dynamic statistics
  const totalTunings = maandelijkseData.reduce((sum, data) => sum + data.tunings, 0)
  const totalOmzet = maandelijkseData.reduce((sum, data) => sum + data.omzet, 0)
  const totalKlanten = maandelijkseData.reduce((sum, data) => sum + data.klanten, 0)
  const gemiddeldeGain = Math.round(maandelijkseData.reduce((sum, data) => sum + data.gemiddeldeGain, 0) / maandelijkseData.length)
  const gemiddeldeTevredenheid = (maandelijkseData.reduce((sum, data) => sum + data.tevredenheid, 0) / maandelijkseData.length).toFixed(1)

  // Filter top voertuigen based on search
  const filteredVoertuigen = topVoertuigen.filter(voertuig =>
    voertuig.merk.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voertuig.model.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleVoertuigClick = (voertuig: typeof topVoertuigen[0]) => {
    setSelectedVoertuig(voertuig)
    setShowDetailModal(true)
  }

  const handleExportData = (type: string) => {
    // Simulate export functionality
    setTimeout(() => {
      showNotification(`${type} rapport succesvol geëxporteerd`, 'success')
      setShowExportModal(false)
    }, 1000)
  }

  const closeModal = () => {
    setShowDetailModal(false)
    setShowExportModal(false)
    setSelectedVoertuig(null)
  }

  const getMetricValue = (data: typeof maandelijkseData[0]) => {
    switch (selectedMetric) {
      case 'tunings': return data.tunings
      case 'omzet': return data.omzet
      case 'klanten': return data.klanten
      case 'gain': return data.gemiddeldeGain
      default: return data.tunings
    }
  }

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'tunings': return 'Tunings'
      case 'omzet': return 'Omzet (€)'
      case 'klanten': return 'Klanten'
      case 'gain': return 'Power Gain (%)'
      default: return 'Tunings'
    }
  }

  const getMaxValue = () => {
    const values = filteredData.map(getMetricValue)
    return Math.max(...values)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {notification.message}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Rapporten</h1>
            <p className="text-secondary-400 mt-2">
              Analyse en statistieken van het chiptuning bedrijf
            </p>
          </div>
          <button 
            onClick={() => setShowExportModal(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Export Rapport</span>
          </button>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="bg-dark-800 rounded-lg p-6 border border-dark-700/50 hover:border-primary-500/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-secondary-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-secondary-400 text-xs mt-1">{stat.detail}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                      <p className={`text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.change} deze maand
                      </p>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-dark-700 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Maandelijkse Trend */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Maandelijkse Trend</h2>
                <p className="text-secondary-400 text-sm">Analyse van {selectedPeriod === '3m' ? '3' : selectedPeriod === '6m' ? '6' : '12'} maanden</p>
              </div>
              <div className="flex items-center space-x-2">
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-1 bg-dark-700 border border-dark-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="3m">3M</option>
                  <option value="6m">6M</option>
                  <option value="12m">12M</option>
                </select>
                <select 
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-1 bg-dark-700 border border-dark-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="tunings">Tunings</option>
                  <option value="omzet">Omzet</option>
                  <option value="klanten">Klanten</option>
                  <option value="gain">Power Gain</option>
                </select>
                <BarChart3 className="h-6 w-6 text-primary-500" />
              </div>
            </div>
            <div className="space-y-4">
              {filteredData.map((data, index) => {
                const value = getMetricValue(data)
                const maxValue = getMaxValue()
                const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0
                
                return (
                  <div key={data.maand} className="flex items-center justify-between">
                    <span className="text-secondary-400 w-12">{data.maand}</span>
                    <div className="flex-1 mx-4">
                      <div className="bg-dark-700 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">
                        {selectedMetric === 'omzet' ? `€${value.toLocaleString()}` : value}
                      </div>
                      <div className="text-secondary-400 text-sm">
                        {selectedMetric === 'gain' ? `${data.gemiddeldeGain}%` : 
                         selectedMetric === 'omzet' ? `${data.tunings} tunings` : 
                         selectedMetric === 'klanten' ? `€${data.omzet.toLocaleString()}` : 
                         `${data.omzet.toLocaleString()} omzet`}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-dark-600">
              <div className="flex justify-between text-sm text-secondary-400">
                <span>Metric: {getMetricLabel()}</span>
                <span>Periode: {selectedPeriod === '3m' ? '3' : selectedPeriod === '6m' ? '6' : '12'} maanden</span>
              </div>
            </div>
          </div>

          {/* Top Voertuigen */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Top Voertuigen</h2>
                <p className="text-secondary-400 text-sm">Meest getunede voertuigen</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Zoek voertuig..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-3 py-1 bg-dark-700 border border-dark-600 rounded text-white text-sm placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <Car className="h-6 w-6 text-primary-500" />
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredVoertuigen.map((voertuig, index) => (
                <div 
                  key={voertuig.id} 
                  className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors cursor-pointer"
                  onClick={() => handleVoertuigClick(voertuig)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-primary-500 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{voertuig.merk} {voertuig.model}</div>
                      <div className="text-secondary-400 text-sm">{voertuig.aantal} tunings • €{voertuig.omzet.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-medium">+{voertuig.gemiddeldeGain}%</div>
                    <div className="text-secondary-400 text-sm flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      {voertuig.tevredenheid}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredVoertuigen.length === 0 && (
              <p className="text-secondary-400 text-center py-4">Geen voertuigen gevonden</p>
            )}
          </div>
        </div>

        {/* Gedetailleerde Statistieken */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tuning Types */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Tuning Types</h3>
              <PieChart className="h-5 w-5 text-primary-500" />
            </div>
            <div className="space-y-4">
              {tuningTypes.map((type) => (
                <div key={type.type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-400">{type.type}</span>
                    <span className="text-white font-medium">{type.percentage}%</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        type.type === 'Stage 1' ? 'bg-blue-500' :
                        type.type === 'Stage 2' ? 'bg-green-500' : 'bg-orange-500'
                      }`} 
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-secondary-400">
                    <span>{type.aantal} tunings</span>
                    <span>€{type.gemiddeldeKosten} gemiddeld</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-dark-600">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalTunings}</div>
                <div className="text-secondary-400 text-sm">Totaal tunings</div>
              </div>
            </div>
          </div>

          {/* Klanttevredenheid */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Klanttevredenheid</h3>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">{gemiddeldeTevredenheid}</div>
              <div className="text-secondary-400 text-sm mb-4">van 5 sterren</div>
              <div className="flex justify-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="text-yellow-400">★</div>
                ))}
              </div>
              <div className="text-secondary-400 text-sm mb-4">{totalTunings} beoordelingen</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">5 sterren</span>
                  <span className="text-white">75%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">4 sterren</span>
                  <span className="text-white">20%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">3 sterren</span>
                  <span className="text-white">5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Efficiency Metrics */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Efficiency Metrics</h3>
              <Target className="h-5 w-5 text-primary-500" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">Gemiddelde Tijd</span>
                  <span className="text-white">2.5 uur</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2 mt-1">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">Succes Rate</span>
                  <span className="text-white">98.5%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2 mt-1">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">Herhalingsklanten</span>
                  <span className="text-white">35%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2 mt-1">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">Gemiddelde Power Gain</span>
                  <span className="text-white">+{gemiddeldeGain}%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2 mt-1">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(gemiddeldeGain / 50) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recente Reviews */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recente Klantreviews</h2>
            <div className="flex items-center space-x-2">
              <span className="text-secondary-400 text-sm">Gemiddeld: {gemiddeldeTevredenheid}/5</span>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {klantReviews.map((review) => (
              <div key={review.id} className="bg-dark-700 rounded-lg p-4 hover:bg-dark-600 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium">{review.klant}</div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="text-secondary-400 text-sm mb-2">{review.voertuig} • {review.type}</div>
                <p className="text-white text-sm leading-relaxed">{review.review}</p>
                <div className="text-secondary-400 text-xs mt-2">{review.datum}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedVoertuig && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Car className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xl">{selectedVoertuig.merk} {selectedVoertuig.model}</h3>
                    <p className="text-secondary-400">Gedetailleerde statistieken</p>
                  </div>
                </div>
                <button onClick={closeModal} className="text-secondary-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-dark-700 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Performance Statistieken</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Aantal tunings:</span>
                        <span className="text-white font-medium">{selectedVoertuig.aantal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Gemiddelde gain:</span>
                        <span className="text-green-400 font-medium">+{selectedVoertuig.gemiddeldeGain}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Totaal omzet:</span>
                        <span className="text-white">€{selectedVoertuig.omzet.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Tevredenheid:</span>
                        <span className="text-yellow-400">{selectedVoertuig.tevredenheid}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-dark-700 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Populariteit</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedVoertuig.populariteit === 'Hoog' ? 'bg-green-500/20 text-green-400' :
                        selectedVoertuig.populariteit === 'Gemiddeld' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedVoertuig.populariteit}
                      </span>
                      <span className="text-secondary-400 text-sm">populair</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-dark-700 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Trend Analyse</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Groei trend:</span>
                        <span className="text-green-400">↗ Stijgend</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Markt positie:</span>
                        <span className="text-blue-400">Top 5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Klant type:</span>
                        <span className="text-white">Performance</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-dark-700 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Aanbevelingen</h4>
                    <ul className="text-sm text-secondary-400 space-y-1">
                      <li>• Focus op {selectedVoertuig.merk} modellen</li>
                      <li>• Promoot {selectedVoertuig.model} tuning</li>
                      <li>• Behoud hoge tevredenheid</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 pt-6 border-t border-dark-600">
                <button
                  onClick={() => handleExportData('Voertuig Rapport')}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Rapport</span>
                </button>
                <button
                  onClick={closeModal}
                  className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sluiten
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg">Export Rapport</h3>
                <button onClick={closeModal} className="text-secondary-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleExportData('PDF Rapport')}
                  className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 p-4 rounded-lg flex items-center space-x-3 transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  <span>Export als PDF</span>
                </button>
                
                <button
                  onClick={() => handleExportData('Excel Rapport')}
                  className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 p-4 rounded-lg flex items-center space-x-3 transition-colors"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Export als Excel</span>
                </button>
                
                <button
                  onClick={() => handleExportData('CSV Data')}
                  className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-4 rounded-lg flex items-center space-x-3 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>Export als CSV</span>
                </button>
              </div>
              
              <div className="mt-6 pt-4 border-t border-dark-600">
                <p className="text-secondary-400 text-sm">
                  Kies het gewenste formaat voor het exporteren van de rapportage data.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
