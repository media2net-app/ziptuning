'use client'

import { useState } from 'react'
import { ArrowLeft, Zap, Gauge, Fuel, TrendingUp, CheckCircle, Star, Download, Share2, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

interface TuningData {
  original: { power: number; torque: number }
  tuned: { power: number; torque: number }
  gains: { power: number; torque: number; percentage: number }
  fuelSavings: number
  stage: string
  price: number
  duration: string
  warranty: string
  description: string
  features: string[]
  beforeAfter: {
    acceleration: { before: string; after: string }
    topspeed: { before: string; after: string }
    fuelConsumption: { before: string; after: string }
  }
}

interface CarInfo {
  brand: string
  model: string
  generation: string
  engine: string
}

interface VermogenswinstTemplateProps {
  carInfo: CarInfo
  tuningData: TuningData
  onRequestQuote: () => void
  isLoading: boolean
  showContactForm: boolean
  onCloseContactForm: () => void
  onSubmitContactForm: (e: React.FormEvent) => void
}

export default function VermogenswinstTemplate({
  carInfo,
  tuningData,
  onRequestQuote,
  isLoading,
  showContactForm,
  onCloseContactForm,
  onSubmitContactForm
}: VermogenswinstTemplateProps) {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navigation */}
      <nav className="bg-dark-900/95 backdrop-blur-sm border-b border-dark-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Ziptuning Noord" className="h-8 w-auto" />
              <span className="ml-3 text-xl font-bold text-white">Noord</span>
            </div>
            <Link href="/" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
              Terug naar Homepage
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar auto selectie
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vermogenswinst voor {carInfo.brand} {carInfo.model}
            </h1>
            <p className="text-xl text-secondary-300 mb-8">
              {carInfo.generation} • {carInfo.engine}
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">+{tuningData.gains.power}pk</div>
                <div className="text-sm text-secondary-400">Vermogenswinst</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">+{tuningData.gains.torque}Nm</div>
                <div className="text-sm text-secondary-400">Koppelwinst</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">{tuningData.gains.percentage}%</div>
                <div className="text-sm text-secondary-400">Verbetering</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Tuning Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Power Comparison */}
              <div className="bg-dark-800 rounded-xl p-8 border border-dark-700/50">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Zap className="h-6 w-6 text-primary-500 mr-3" />
                  Vermogensvergelijking
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Original */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-secondary-400 mb-4">Origineel</h3>
                    <div className="bg-dark-700 rounded-lg p-6">
                      <div className="text-3xl font-bold text-white mb-2">{tuningData.original.power}pk</div>
                      <div className="text-secondary-400">Vermogen</div>
                      <div className="text-2xl font-bold text-white mt-4 mb-2">{tuningData.original.torque}Nm</div>
                      <div className="text-secondary-400">Koppel</div>
                    </div>
                  </div>
                  
                  {/* Tuned */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-primary-400 mb-4">Na Tuning</h3>
                    <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-6">
                      <div className="text-3xl font-bold text-primary-500 mb-2">{tuningData.tuned.power}pk</div>
                      <div className="text-primary-300">Vermogen</div>
                      <div className="text-2xl font-bold text-primary-500 mt-4 mb-2">{tuningData.tuned.torque}Nm</div>
                      <div className="text-primary-300">Koppel</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Improvements */}
              <div className="bg-dark-800 rounded-xl p-8 border border-dark-700/50">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 text-primary-500 mr-3" />
                  Prestatieverbeteringen
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-dark-700 rounded-lg p-4">
                      <div className="text-sm text-secondary-400 mb-2">0-100 km/h</div>
                      <div className="text-lg font-bold text-white">{tuningData.beforeAfter.acceleration.before}</div>
                      <div className="text-sm text-secondary-400 mt-1">→</div>
                      <div className="text-lg font-bold text-primary-500">{tuningData.beforeAfter.acceleration.after}</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-dark-700 rounded-lg p-4">
                      <div className="text-sm text-secondary-400 mb-2">Topsnelheid</div>
                      <div className="text-lg font-bold text-white">{tuningData.beforeAfter.topspeed.before}</div>
                      <div className="text-sm text-secondary-400 mt-1">→</div>
                      <div className="text-lg font-bold text-primary-500">{tuningData.beforeAfter.topspeed.after}</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-dark-700 rounded-lg p-4">
                      <div className="text-sm text-secondary-400 mb-2">Brandstofverbruik</div>
                      <div className="text-lg font-bold text-white">{tuningData.beforeAfter.fuelConsumption.before}</div>
                      <div className="text-sm text-secondary-400 mt-1">→</div>
                      <div className="text-lg font-bold text-primary-500">{tuningData.beforeAfter.fuelConsumption.after}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-dark-800 rounded-xl p-8 border border-dark-700/50">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 text-primary-500 mr-3" />
                  Wat krijgt u bij deze tuning?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tuningData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-dark-700 rounded-lg">
                  <p className="text-secondary-300">{tuningData.description}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Contact */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <div className="bg-dark-800 rounded-xl p-6 border border-dark-700/50 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4">Prijsoverzicht</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-400">Stage 1 Tuning</span>
                    <span className="text-white font-semibold">€{tuningData.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-400">Inclusief:</span>
                    <span className="text-green-400 text-sm">2 jaar garantie</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-400">Duur:</span>
                    <span className="text-white text-sm">{tuningData.duration}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-400">Brandstofbesparing:</span>
                    <span className="text-green-400 text-sm">Tot {tuningData.fuelSavings}%</span>
                  </div>
                </div>
                
                <button
                  onClick={onRequestQuote}
                  disabled={isLoading}
                  className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white py-3 rounded-lg font-semibold transition-colors mt-6 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>Offerte Aanvragen</span>
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </>
                  )}
                </button>
                
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-transparent border border-dark-600 text-white hover:bg-dark-700 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>PDF</span>
                  </button>
                  <button className="flex-1 bg-transparent border border-dark-600 text-white hover:bg-dark-700 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span>Delen</span>
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-dark-800 rounded-xl p-6 border border-dark-700/50">
                <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary-500" />
                    <span className="text-white">+31 6 12345678</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary-500" />
                    <span className="text-white">info@ziptuningnoord.nl</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary-500" />
                    <span className="text-white text-sm">Werkplaats Noord<br />123 Tuningstraat<br />1234 AB Noord</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary-500" />
                    <span className="text-white text-sm">Ma-Vr: 08:00-18:00<br />Za: 09:00-17:00</span>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-dark-800 rounded-xl p-6 border border-dark-700/50">
                <h3 className="text-xl font-bold text-white mb-4">Klantbeoordelingen</h3>
                
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-white font-semibold">4.8/5</span>
                  <span className="ml-2 text-secondary-400 text-sm">(1447 reviews)</span>
                </div>
                
                <p className="text-secondary-300 text-sm">
                  "Fantastisch resultaat! Mijn auto rijdt nu veel vloeiender en ik bespaar ook nog brandstof. Top service!"
                </p>
                <div className="text-white text-sm mt-2 font-semibold">- Xavier M.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-800 rounded-xl p-8 border border-dark-700/50 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-6">Offerte Aanvragen</h3>
            
            <form onSubmit={onSubmitContactForm} className="space-y-4">
              <input
                type="text"
                placeholder="Voornaam"
                required
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="text"
                placeholder="Achternaam"
                required
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="email"
                placeholder="Email adres"
                required
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="tel"
                placeholder="Telefoonnummer"
                required
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <textarea
                placeholder="Opmerkingen of vragen..."
                rows={3}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onCloseContactForm}
                  className="flex-1 bg-transparent border border-dark-600 text-white hover:bg-dark-700 py-3 rounded-lg transition-colors"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg transition-colors"
                >
                  Verzenden
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

