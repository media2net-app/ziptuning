'use client'

import { useState } from 'react'
import { ChevronDown, Play, Star, CheckCircle, ArrowRight, Car, Zap, Fuel, Gauge, Users, Award, Phone, Mail, MapPin, Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedGeneration, setSelectedGeneration] = useState('')
  const [selectedEngine, setSelectedEngine] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Sample data - in real app this would come from API
  const brands = [
    'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Porsche', 'Ferrari', 
    'Lamborghini', 'Land Rover', 'Jaguar', 'Volvo', 'Ford', 'Opel'
  ]

  const models = {
    'Audi': ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'RS3', 'RS4', 'RS6', 'TT', 'R8'],
    'BMW': ['1 Serie', '2 Serie', '3 Serie', '4 Serie', '5 Serie', '6 Serie', '7 Serie', 'X1', 'X3', 'X5', 'X6', 'M3', 'M4', 'M5'],
    'Mercedes-Benz': ['A-Klasse', 'C-Klasse', 'E-Klasse', 'S-Klasse', 'GLA', 'GLC', 'GLE', 'GLS', 'AMG GT', 'SL'],
    'Volkswagen': ['Golf', 'Polo', 'Passat', 'Tiguan', 'Touareg', 'Arteon', 'ID.3', 'ID.4'],
    'Porsche': ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', 'Boxster', 'Cayman'],
    'Ferrari': ['488', 'F8', 'SF90', 'Roma', 'Portofino', '812'],
    'Lamborghini': ['Huracán', 'Aventador', 'Urus'],
    'Land Rover': ['Defender', 'Discovery', 'Range Rover', 'Range Rover Sport', 'Range Rover Evoque'],
    'Jaguar': ['F-PACE', 'E-PACE', 'I-PACE', 'XF', 'XE', 'F-TYPE'],
    'Volvo': ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'V90'],
    'Ford': ['Focus', 'Fiesta', 'Mondeo', 'Kuga', 'Explorer', 'Mustang'],
    'Opel': ['Astra', 'Corsa', 'Insignia', 'Crossland', 'Grandland', 'Mokka']
  }

  const generations = {
    'Audi A3': ['8Y (2020-heden)', '8V (2012-2020)', '8P (2003-2013)'],
    'Audi A4': ['B9 (2016-2023)', 'B8 (2008-2016)', 'B7 (2004-2008)'],
    'BMW 3 Serie': ['G20 (2019-heden)', 'F30 (2012-2019)', 'E90 (2005-2012)'],
    'BMW M3': ['G80 (2021-heden)', 'F80 (2014-2020)', 'E90 (2007-2013)'],
    'Mercedes-Benz C-Klasse': ['W205 (2014-2021)', 'W204 (2007-2014)', 'W203 (2000-2007)'],
    'Porsche 911': ['992 (2019-heden)', '991 (2011-2019)', '997 (2004-2012)'],
    'Volkswagen Golf': ['Mk8 (2019-heden)', 'Mk7 (2012-2019)', 'Mk6 (2008-2012)']
  }

  const engines = {
    'Audi A3 8Y': ['1.0 TFSI (110pk)', '1.5 TFSI (150pk)', '2.0 TFSI (190pk)', '2.0 TDI (150pk)'],
    'BMW 3 Serie G20': ['2.0i (184pk)', '2.0d (190pk)', '3.0i (258pk)', 'M340i (374pk)'],
    'Mercedes-Benz C-Klasse W205': ['2.0 (184pk)', '2.0d (170pk)', '3.0 (333pk)', 'AMG C63 (476pk)'],
    'Porsche 911 992': ['3.0 Carrera (385pk)', '3.0 Carrera S (450pk)', '3.0 Carrera 4S (450pk)', '3.0 Turbo S (650pk)'],
    'Volkswagen Golf Mk8': ['1.5 TSI (150pk)', '2.0 TSI (245pk)', '2.0 TDI (150pk)', 'GTE (245pk)']
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand)
    setSelectedModel('')
    setSelectedGeneration('')
    setSelectedEngine('')
  }

  const handleModelChange = (model: string) => {
    setSelectedModel(model)
    setSelectedGeneration('')
    setSelectedEngine('')
  }

  const handleGenerationChange = (generation: string) => {
    setSelectedGeneration(generation)
    setSelectedEngine('')
  }

  const handleEngineChange = (engine: string) => {
    setSelectedEngine(engine)
  }

  const getAvailableModels = () => {
    return selectedBrand ? models[selectedBrand as keyof typeof models] || [] : []
  }

  const getAvailableGenerations = () => {
    const key = `${selectedBrand} ${selectedModel}`
    return generations[key as keyof typeof generations] || []
  }

  const getAvailableEngines = () => {
    const key = `${selectedBrand} ${selectedModel} ${selectedGeneration.split(' ')[0]}`
    return engines[key as keyof typeof engines] || []
  }

  const canGetQuote = selectedBrand && selectedModel && selectedGeneration && selectedEngine

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navigation */}
      <nav className="bg-dark-900/95 backdrop-blur-sm border-b border-dark-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/logo.svg" alt="Ziptuning Noord" className="h-8 w-auto" />
              <span className="ml-3 text-xl font-bold text-white">Noord</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-white hover:text-primary-400 transition-colors">Home</a>
              <a href="#services" className="text-white hover:text-primary-400 transition-colors">Diensten</a>
              <a href="#about" className="text-white hover:text-primary-400 transition-colors">Over Ons</a>
              <a href="#reviews" className="text-white hover:text-primary-400 transition-colors">Reviews</a>
              <a href="#contact" className="text-white hover:text-primary-400 transition-colors">Contact</a>
              <Link href="/dashboard" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                Dashboard
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-primary-400 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-dark-800 border-t border-dark-700/50">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-white hover:text-primary-400 transition-colors">Home</a>
                <a href="#services" className="block px-3 py-2 text-white hover:text-primary-400 transition-colors">Diensten</a>
                <a href="#about" className="block px-3 py-2 text-white hover:text-primary-400 transition-colors">Over Ons</a>
                <a href="#reviews" className="block px-3 py-2 text-white hover:text-primary-400 transition-colors">Reviews</a>
                <a href="#contact" className="block px-3 py-2 text-white hover:text-primary-400 transition-colors">Contact</a>
                <Link href="/dashboard" className="block px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                  Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Waar passie en prestaties samenkomen
            </h1>
            <p className="text-xl md:text-2xl text-secondary-300 mb-8 max-w-3xl mx-auto">
              De tuner van Noord-Nederland. Meer vermogen, betere prestaties en brandstofbesparing voor uw voertuig.
            </p>
            
            {/* Live Stats */}
            <div className="flex justify-center items-center space-x-8 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">130</div>
                <div className="text-sm text-secondary-400">bezoekers actief</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">18</div>
                <div className="text-sm text-secondary-400">aanvragen vandaag</div>
              </div>
            </div>

            {/* Car Selector */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700/50 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Vind hieronder eenvoudig uw auto</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Brand Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-white mb-2">Kies uw merk</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                  >
                    <option value="">Selecteer merk</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-secondary-400 pointer-events-none" />
                </div>

                {/* Model Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-white mb-2">Kies uw model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => handleModelChange(e.target.value)}
                    disabled={!selectedBrand}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Selecteer model</option>
                    {getAvailableModels().map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-secondary-400 pointer-events-none" />
                </div>

                {/* Generation Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-white mb-2">Kies de generatie</label>
                  <select
                    value={selectedGeneration}
                    onChange={(e) => handleGenerationChange(e.target.value)}
                    disabled={!selectedModel}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Selecteer generatie</option>
                    {getAvailableGenerations().map((generation) => (
                      <option key={generation} value={generation}>{generation}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-secondary-400 pointer-events-none" />
                </div>

                {/* Engine Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-white mb-2">Kies het motortype</label>
                  <select
                    value={selectedEngine}
                    onChange={(e) => handleEngineChange(e.target.value)}
                    disabled={!selectedGeneration}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Selecteer motor</option>
                    {getAvailableEngines().map((engine) => (
                      <option key={engine} value={engine}>{engine}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-secondary-400 pointer-events-none" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    if (canGetQuote) {
                      // Scroll to contact form
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  disabled={!canGetQuote}
                  className="bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Offerte Aanvragen</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => {
                    if (canGetQuote) {
                      // Create SEO-friendly URL
                      const brandSlug = selectedBrand.toLowerCase().replace(/\s+/g, '-')
                      const modelSlug = selectedModel.toLowerCase().replace(/\s+/g, '-')
                      const generationSlug = selectedGeneration.toLowerCase()
                        .replace(/[()]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '')
                      
                      // Special handling for engine slugs
                      let engineSlug = selectedEngine.toLowerCase()
                        .replace(/[()]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/\./g, '') // Remove dots completely for TFSI/TSI engines
                        .replace(/[^a-z0-9-]/g, '')
                      
                      const seoUrl = `/vermogenswinst/${brandSlug}/${modelSlug}/${generationSlug}/${engineSlug}`
                      window.location.href = seoUrl
                    }
                  }}
                  disabled={!canGetQuote}
                  className="bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white disabled:border-primary-500/50 disabled:text-primary-500/50 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Bekijk Vermogenswinst</span>
                  <Gauge className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Chiptuning op maat</h2>
            <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
              Wilt u meer rijplezier (power) en besparen op uw brandstofkosten? Een chiptuning op maat van Ziptuning Noord maakt het voor u waar!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-dark-700 rounded-xl p-6 border border-dark-600/50 hover:border-primary-500/50 transition-colors">
              <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Extra Vermogen</h3>
              <p className="text-secondary-300">
                Tot 30% meer vermogen en koppel voor betere prestaties en rijplezier.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-dark-700 rounded-xl p-6 border border-dark-600/50 hover:border-primary-500/50 transition-colors">
              <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Fuel className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Brandstofbesparing</h3>
              <p className="text-secondary-300">
                Bespaar tot 5% op brandstofkosten door geoptimaliseerde verbranding.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-dark-700 rounded-xl p-6 border border-dark-600/50 hover:border-primary-500/50 transition-colors">
              <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Gauge className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Betere Prestaties</h3>
              <p className="text-secondary-300">
                Meer souplesse, betere acceleratie en verbeterd rijcomfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Chiptuning, kies voor een expert</h2>
            <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
              Ziptuning Noord is een groeiende, ambitieuze organisatie die u graag helpt met al uw vragen over chiptunen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-500/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Op maat ontwikkeld</h3>
                <p className="text-secondary-300">Uitvoerig geteste chiptuning-producten specifiek voor uw voertuig.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-500/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Gauge className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Vermogentestbank</h3>
                <p className="text-secondary-300">Nauwkeurige analyses en software ontwikkeling op onze testbank.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-500/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Gediplomeerde technici</h3>
                <p className="text-secondary-300">Jarenlange ervaring in chiptuning en motordiagnose.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-500/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Kwaliteitsgarantie</h3>
                <p className="text-secondary-300">Duurzaam en veilig kwaliteitsproduct met uitgebreide garantie.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-500/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Fuel className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Brandstofbesparend</h3>
                <p className="text-secondary-300">Speciale programma's voor de logistieke sector en bedrijfswagens.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-500/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Emissie-normen</h3>
                <p className="text-secondary-300">Alle tuning blijft binnen de geldende emissie-normen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Reviews van onze klanten</h2>
            <p className="text-xl text-secondary-300">
              Ziptuning Noord streeft altijd naar de beste resultaten en 100% klanttevredenheid
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-dark-700 rounded-xl p-6 border border-dark-600/50">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-secondary-400">8 maanden geleden</span>
              </div>
              <p className="text-secondary-300 mb-4">
                "Zowel afspraak per telefoon en mail was erg prettig. Ontvangst was erg goed. De auto's van mijn kinderen zijn prima getuned. Wat een service!"
              </p>
              <div className="font-semibold text-white">- Kransse</div>
            </div>

            {/* Review 2 */}
            <div className="bg-dark-700 rounded-xl p-6 border border-dark-600/50">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-secondary-400">9 maanden geleden</span>
              </div>
              <p className="text-secondary-300 mb-4">
                "Vlotte reactie op offerte aanvraag, redelijke prijs, op vrij korte termijn datum geprikt. Resultaat was onmiddellijk merkbaar bij deze Audi. Wat een verschil!"
              </p>
              <div className="font-semibold text-white">- Mick</div>
            </div>

            {/* Review 3 */}
            <div className="bg-dark-700 rounded-xl p-6 border border-dark-600/50">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-secondary-400">1 week geleden</span>
              </div>
              <p className="text-secondary-300 mb-4">
                "Topbedrijf, kan niet anders zeggen. Mijn Kia Proceed GT is geweldig getuned. De auto rijdt nu veel vloeiender en ik haal 50km meer uit een tank!"
              </p>
              <div className="font-semibold text-white">- Xavier</div>
            </div>
          </div>

          {/* Trustpilot Section */}
          <div className="mt-16 text-center">
            <div className="bg-dark-700 rounded-xl p-8 border border-dark-600/50 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Trustpilot Reviews</h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current" />
                  ))}
                </div>
                <span className="text-2xl font-bold text-white">4.8/5</span>
              </div>
              <p className="text-secondary-300">1447 reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact</h2>
            <p className="text-xl text-secondary-300">
              Neem contact met ons op voor een offerte of meer informatie
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-500/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Adres</h3>
                  <p className="text-secondary-300">
                    Werkplaats Noord<br />
                    123 Tuningstraat<br />
                    1234 AB Noord
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-500/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Telefoon</h3>
                  <p className="text-secondary-300">+31 6 12345678</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-500/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                  <p className="text-secondary-300">info@ziptuningnoord.nl</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-dark-700 rounded-xl p-8 border border-dark-600/50">
              <h3 className="text-xl font-semibold text-white mb-6">Offerte Aanvragen</h3>
              
              {/* Selected Car Info */}
              {canGetQuote && (
                <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4 mb-6">
                  <h4 className="text-primary-400 font-semibold mb-2">Geselecteerde auto:</h4>
                  <p className="text-white">
                    {selectedBrand} {selectedModel} • {selectedGeneration} • {selectedEngine}
                  </p>
                </div>
              )}
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Voornaam"
                    required
                    className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    placeholder="Achternaam"
                    required
                    className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email adres"
                  required
                  className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="tel"
                  placeholder="Telefoonnummer"
                  required
                  className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <textarea
                  placeholder="Vertel ons over uw wensen en vragen..."
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Offerte Aanvragen
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-950 border-t border-dark-700/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/logo.svg" alt="Ziptuning Noord" className="h-8 w-auto" />
                <span className="ml-3 text-xl font-bold text-white">Noord</span>
              </div>
              <p className="text-secondary-400">
                De specialist in chiptuning voor Noord-Nederland. Meer vermogen, betere prestaties en brandstofbesparing.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Diensten</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#" className="hover:text-white transition-colors">Chiptuning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Stage 1 Tuning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Stage 2 Tuning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">DSG Tuning</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Chiptuning per Stad</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><Link href="/chiptuning/assen" className="hover:text-white transition-colors">Chiptuning Assen</Link></li>
                <li><Link href="/chiptuning/emmen" className="hover:text-white transition-colors">Chiptuning Emmen</Link></li>
                <li><Link href="/chiptuning/hoogeveen" className="hover:text-white transition-colors">Chiptuning Hoogeveen</Link></li>
                <li><Link href="/chiptuning/meppel" className="hover:text-white transition-colors">Chiptuning Meppel</Link></li>
                <li><Link href="/chiptuning/coevorden" className="hover:text-white transition-colors">Chiptuning Coevorden</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Bedrijf</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#" className="hover:text-white transition-colors">Over Ons</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Garantie</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-secondary-400">
                <li>+31 6 12345678</li>
                <li>info@ziptuningnoord.nl</li>
                <li>Werkplaats Noord<br />123 Tuningstraat<br />1234 AB Noord</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-dark-700/50 mt-8 pt-8 text-center text-secondary-400">
            <p>&copy; 2025 Ziptuning Noord. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
