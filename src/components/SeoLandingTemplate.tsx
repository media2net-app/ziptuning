'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Clock, Star, Shield, Zap, Users, Car, CheckCircle, Phone, Mail, ArrowRight, Award, TrendingUp, Fuel } from 'lucide-react'

interface Testimonial {
  name: string
  location: string
  car: string
  rating: number
  text: string
}

interface SeoLandingTemplateProps {
  title: string
  description: string
  keywords: string
  city: string
  province: string
  population: string
  features: string[]
  testimonials: Testimonial[]
  serviceArea: string[]
}

export default function SeoLandingTemplate({
  title,
  description,
  keywords,
  city,
  province,
  population,
  features,
  testimonials,
  serviceArea
}: SeoLandingTemplateProps) {
  const [showContactForm, setShowContactForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRequestQuote = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowContactForm(true)
    }, 1000)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Offerte aanvraag verzonden! We nemen binnen 24 uur contact met u op.')
    setShowContactForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Navigation */}
      <nav className="bg-dark-900/80 backdrop-blur-sm border-b border-dark-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.svg" alt="Ziptuning Noord" className="h-8 w-auto" />
              <span className="text-xl font-bold text-white">Noord</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-secondary-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="text-secondary-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <button
                onClick={handleRequestQuote}
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Gratis Offerte
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
              <MapPin className="h-4 w-4 text-primary-400 mr-2" />
              <span className="text-primary-400 text-sm font-medium">Chiptuning {city} - {province}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Chiptuning in <span className="text-primary-400">{city}</span>
            </h1>
            <p className="text-xl text-secondary-300 mb-8 max-w-4xl mx-auto">
              Ziptuning Noord is dé chiptuning specialist voor {city} en omgeving. 
              Met meer dan {population} inwoners in {city} zijn wij uw betrouwbare partner voor professionele auto tuning. 
              Ontdek online eenvoudig welke vermogenswinst mogelijk is voor uw auto en vraag direct een gratis offerte aan.
            </p>
            <p className="text-lg text-secondary-400 mb-8 max-w-4xl mx-auto">
              Onze ervaren technici verhogen het vermogen van uw auto met 20-35% terwijl u bespaart op brandstofkosten. 
              Alle tuning werkzaamheden worden uitgevoerd met 2 jaar volledige garantie en gratis diagnose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRequestQuote}
                disabled={isLoading}
                className="bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Laden...
                  </>
                ) : (
                  <>
                    Gratis Offerte Aanvragen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
              <Link
                href="tel:+31512345678"
                className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Bel Direct: 051-234-5678
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6 text-center">
              <TrendingUp className="h-8 w-8 text-primary-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">25-35%</div>
              <div className="text-secondary-400">Vermogenswinst</div>
            </div>
            <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6 text-center">
              <Shield className="h-8 w-8 text-primary-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">2 Jaar</div>
              <div className="text-secondary-400">Garantie</div>
            </div>
            <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6 text-center">
              <Clock className="h-8 w-8 text-primary-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">2-3 Uur</div>
              <div className="text-secondary-400">Werkzaamheden</div>
            </div>
            <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6 text-center">
              <Award className="h-8 w-8 text-primary-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-secondary-400">Tevreden Klanten</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Waarom kiezen voor chiptuning in {city} bij Ziptuning Noord?
            </h2>
            <p className="text-secondary-300 max-w-4xl mx-auto mb-6">
              Ziptuning Noord is al jaren dé vertrouwde chiptuning specialist in {city} en de hele provincie {province}. 
              Onze moderne werkplaats in {city} is uitgerust met de nieuwste apparatuur en testbanken, waardoor wij de perfecte tuning kunnen leveren voor uw auto.
            </p>
            <p className="text-secondary-300 max-w-4xl mx-auto">
              Met meer dan {population} inwoners in {city} hebben wij een uitgebreide klantenbasis opgebouwd die vertrouwt op onze expertise. 
              Onze ervaren technici hebben jarenlange ervaring met alle merken en modellen, van BMW en Audi tot Mercedes-Benz en Volkswagen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6">
                <CheckCircle className="h-6 w-6 text-primary-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              De voordelen van professionele chiptuning in {city}
            </h2>
            <p className="text-secondary-300 max-w-4xl mx-auto">
              Chiptuning bij Ziptuning Noord in {city} biedt tal van voordelen voor uw auto en uw portemonnee. 
              Ontdek waarom duizenden automobilisten in {city} en omgeving kiezen voor onze professionele tuning diensten.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6">
              <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Meer vermogen en koppel</h3>
              <p className="text-secondary-300">
                Onze chiptuning verhoogt het vermogen van uw auto met 20-35% en het koppel met tot 30%. 
                Dit resulteert in betere acceleratie, meer trekkracht en een sportievere rij-ervaring.
              </p>
            </div>
            
            <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6">
              <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Fuel className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Brandstofbesparing tot 8%</h3>
              <p className="text-secondary-300">
                Door de geoptimaliseerde verbranding bespaart u tot 8% op uw brandstofkosten. 
                Dit betekent dat de investering in chiptuning zich vaak binnen 1-2 jaar terugverdient.
              </p>
            </div>
            
            <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6">
              <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">2 jaar volledige garantie</h3>
              <p className="text-secondary-300">
                Alle chiptuning werkzaamheden worden uitgevoerd met 2 jaar volledige garantie. 
                Bovendien blijft uw auto binnen alle geldende emissie-normen en APK-eisen.
              </p>
            </div>
          </div>
          
          <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Online vermogenswinst bekijken voor uw auto</h3>
            <p className="text-secondary-300 mb-6">
              Bij Ziptuning Noord in {city} kunt u eenvoudig online bekijken welke vermogenswinst mogelijk is voor uw specifieke auto. 
              Onze uitgebreide database bevat tuning mogelijkheden voor honderden merken en modellen. 
              Vul eenvoudig uw automerk, model, generatie en motortype in en ontdek direct welke prestaties uw auto kan leveren na chiptuning.
            </p>
            <p className="text-secondary-300">
              Dit online systeem helpt u om een weloverwogen beslissing te maken voordat u naar onze werkplaats in {city} komt. 
              U ziet exact welke vermogenswinst u kunt verwachten, wat de kosten zijn en hoe lang de werkzaamheden duren.
            </p>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Onze Service Gebied rondom {city}
            </h2>
            <p className="text-secondary-300 max-w-2xl mx-auto">
              Wij leveren chiptuning diensten in {city} en de omliggende plaatsen in {province}.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {serviceArea.map((place, index) => (
              <div key={index} className="bg-dark-800/50 border border-dark-700/50 rounded-lg p-4 text-center">
                <div className="text-white font-medium">{place}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Wat Onze Klanten Zeggen
            </h2>
            <p className="text-secondary-300 max-w-2xl mx-auto">
              Lees de ervaringen van onze tevreden klanten uit {city} en omgeving.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-secondary-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t border-dark-700/50 pt-4">
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-secondary-400 text-sm">{testimonial.location}</div>
                  <div className="text-primary-400 text-sm">{testimonial.car}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Klaar voor professionele chiptuning in {city}?
          </h2>
          <p className="text-xl text-secondary-300 mb-6">
            Ziptuning Noord is uw betrouwbare partner voor chiptuning in {city} en omgeving. 
            Met meer dan {population} inwoners in {city} hebben wij een bewezen track record opgebouwd.
          </p>
          <p className="text-lg text-secondary-300 mb-8">
            Neem vandaag nog contact op voor een gratis diagnose en offerte. 
            Onze ervaren technici helpen u graag met het optimaliseren van uw auto voor meer vermogen, 
            betere prestaties en brandstofbesparing. Vraag direct online een offerte aan of bel voor persoonlijk advies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRequestQuote}
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              Gratis Offerte Aanvragen
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link
              href="tel:+31512345678"
              className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              Bel Direct
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-700/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo.svg" alt="Ziptuning Noord" className="h-8 w-auto" />
                <span className="text-xl font-bold text-white">Noord</span>
              </div>
              <p className="text-secondary-400">
                Ziptuning Noord is dé chiptuning specialist voor {city} en de hele provincie {province}. 
                Met meer dan {population} inwoners in {city} zijn wij uw betrouwbare partner voor professionele auto tuning. 
                Verhoog het vermogen van uw auto met 20-35% en bespaar op brandstofkosten. 
                Alle werkzaamheden worden uitgevoerd met 2 jaar volledige garantie.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-secondary-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  051-234-5678
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@ziptuningnoord.nl
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {city}, {province}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Diensten</h3>
              <div className="space-y-2 text-secondary-400">
                <div>Chiptuning</div>
                <div>Vermogenswinst</div>
                <div>Brandstofbesparing</div>
                <div>Diagnose</div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Service Gebied</h3>
              <div className="space-y-2 text-secondary-400">
                {serviceArea.slice(0, 4).map((place, index) => (
                  <div key={index}>{place}</div>
                ))}
                <div>En meer...</div>
              </div>
            </div>
          </div>
          <div className="border-t border-dark-700/50 mt-8 pt-8 text-center text-secondary-400">
            <p>&copy; 2024 Ziptuning Noord. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-800 border border-dark-700/50 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Gratis Offerte Aanvragen</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-secondary-300 text-sm font-medium mb-2">
                  Naam
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-secondary-300 text-sm font-medium mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-secondary-300 text-sm font-medium mb-2">
                  Telefoon
                </label>
                <input
                  type="tel"
                  required
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-secondary-300 text-sm font-medium mb-2">
                  Auto (merk, model, motor)
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
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
