'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { 
  Car, 
  Users, 
  TrendingUp, 
  Calendar,
  Activity,
  Zap,
  Inbox,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
  MessageSquare,
  Search,
  Globe,
  MapPin
} from 'lucide-react'

const stats = [
  {
    title: 'Totaal Voertuigen',
    value: '247',
    change: '+12%',
    icon: Car,
    color: 'text-blue-500',
    href: '/dashboard/voertuigen'
  },
  {
    title: 'Actieve Klanten',
    value: '1,234',
    change: '+8%',
    icon: Users,
    color: 'text-green-500',
    href: '/dashboard/klanten'
  },
  {
    title: 'Nieuwe Aanvragen',
    value: '23',
    change: '+15%',
    icon: Inbox,
    color: 'text-orange-500',
    href: '/dashboard/leads'
  },
  {
    title: 'Vandaag Afspraken',
    value: '8',
    change: '+2',
    icon: Calendar,
    color: 'text-purple-500',
    href: '/dashboard/afspraken'
  }
]

const recentTunings = [
  {
    id: 1,
    klant: 'Jan Jansen',
    voertuig: 'BMW 320d (2019)',
    type: 'Stage 1 Tuning',
    datum: '2024-01-15',
    status: 'Voltooid',
    powerGain: '+28%',
    torqueGain: '+32%'
  },
  {
    id: 2,
    klant: 'Piet de Vries',
    voertuig: 'Audi A4 2.0 TDI',
    type: 'Stage 2 Tuning',
    datum: '2024-01-14',
    status: 'In behandeling',
    powerGain: '+35%',
    torqueGain: '+40%'
  },
  {
    id: 3,
    klant: 'Klaas Bakker',
    voertuig: 'Volkswagen Golf GTI',
    type: 'ECU Tuning',
    datum: '2024-01-13',
    status: 'Voltooid',
    powerGain: '+35%',
    torqueGain: '+38%'
  }
]

const recentLeads = [
  {
    id: 1,
    naam: 'Mark de Vries',
    voertuig: 'BMW 520d (2020)',
    type: 'Stage 1 Tuning',
    datum: '2024-01-20 14:30',
    status: 'Nieuw',
    prioriteit: 'Hoog',
    email: 'mark.devries@email.nl',
    telefoon: '+31 6 11111111'
  },
  {
    id: 2,
    naam: 'Lisa Bakker',
    voertuig: 'Audi A3 2.0 TDI',
    type: 'ECU Tuning',
    datum: '2024-01-20 13:15',
    status: 'In behandeling',
    prioriteit: 'Normaal',
    email: 'lisa.bakker@email.nl',
    telefoon: '+31 6 22222222'
  },
  {
    id: 3,
    naam: 'Tom Jansen',
    voertuig: 'Volkswagen Golf R',
    type: 'Stage 2 Tuning',
    datum: '2024-01-20 11:45',
    status: 'Beantwoord',
    prioriteit: 'Hoog',
    email: 'tom.jansen@email.nl',
    telefoon: '+31 6 33333333'
  }
]

const upcomingAppointments = [
  {
    id: 1,
    klant: 'Jan Jansen',
    voertuig: 'BMW 320d (2019)',
    type: 'Stage 1 Tuning',
    datum: '2024-01-20',
    tijd: '09:00 - 11:00',
    status: 'Bevestigd'
  },
  {
    id: 2,
    klant: 'Piet de Vries',
    voertuig: 'Audi A4 2.0 TDI',
    type: 'Stage 2 Tuning',
    datum: '2024-01-20',
    tijd: '13:00 - 15:00',
    status: 'Bevestigd'
  },
  {
    id: 3,
    klant: 'Klaas Bakker',
    voertuig: 'Volkswagen Golf GTI',
    type: 'ECU Tuning',
    datum: '2024-01-21',
    tijd: '10:00 - 12:00',
    status: 'Bevestigd'
  }
]

export default function Dashboard() {
  const [selectedLead, setSelectedLead] = useState<typeof recentLeads[0] | null>(null)
  const [selectedTuning, setSelectedTuning] = useState<typeof recentTunings[0] | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<typeof upcomingAppointments[0] | null>(null)

  const handleLeadClick = (lead: typeof recentLeads[0]) => {
    setSelectedLead(lead)
    console.log('Lead geselecteerd:', lead)
    // Hier kun je een modal openen of naar detail pagina navigeren
  }

  const handleTuningClick = (tuning: typeof recentTunings[0]) => {
    setSelectedTuning(tuning)
    console.log('Tuning geselecteerd:', tuning)
    // Hier kun je een modal openen of naar detail pagina navigeren
  }

  const handleAppointmentClick = (appointment: typeof upcomingAppointments[0]) => {
    setSelectedAppointment(appointment)
    console.log('Afspraak geselecteerd:', appointment)
    // Hier kun je een modal openen of naar detail pagina navigeren
  }

  const handleStatClick = (stat: typeof stats[0]) => {
    console.log('Statistiek geklikt:', stat.title)
    // Hier kun je navigeren naar de relevante pagina
    window.location.href = stat.href
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-secondary-400 mt-2">
            Welkom terug! Hier is een overzicht van uw chiptuning activiteiten.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div 
                key={stat.title} 
                className="bg-dark-800 rounded-lg p-6 border border-dark-700/50 hover:border-primary-500/50 transition-all duration-200 cursor-pointer transform hover:scale-105"
                onClick={() => handleStatClick(stat)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-secondary-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-green-400 text-sm mt-1">{stat.change} deze maand</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-dark-700 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* SEO AI Overzicht */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">SEO AI - Landingspagina's</h2>
            <Search className="h-5 w-5 text-primary-500" />
          </div>
          
          {/* SEO Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-dark-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-500/10 p-2 rounded-lg">
                  <Globe className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-secondary-400">Totaal Pagina's</p>
                  <p className="text-xl font-bold text-white">40</p>
                </div>
              </div>
            </div>
            <div className="bg-dark-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-secondary-400">Hoofdsteden</p>
                  <p className="text-xl font-bold text-white">20</p>
                </div>
              </div>
            </div>
            <div className="bg-dark-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/10 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-secondary-400">Servicegebieden</p>
                  <p className="text-xl font-bold text-white">20</p>
                </div>
              </div>
            </div>
            <div className="bg-dark-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <Star className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-secondary-400">Gem. SEO Score</p>
                  <p className="text-xl font-bold text-white">92/100</p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Pagina's Overzicht */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Alle SEO Landingspagina's</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {[
                // Drenthe
                { city: 'Assen', province: 'Drenthe', views: '1.247', score: '94/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Emmen', province: 'Drenthe', views: '2.156', score: '92/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Hoogeveen', province: 'Drenthe', views: '1.089', score: '93/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Meppel', province: 'Drenthe', views: '876', score: '91/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Coevorden', province: 'Drenthe', views: '743', score: '95/100', type: 'Hoofdstad', status: 'Geschreven' },
                // Overijssel
                { city: 'Zwolle', province: 'Overijssel', views: '1.892', score: '96/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Enschede', province: 'Overijssel', views: '1.654', score: '94/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Deventer', province: 'Overijssel', views: '1.234', score: '93/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Almelo', province: 'Overijssel', views: '987', score: '92/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Hengelo', province: 'Overijssel', views: '1.123', score: '91/100', type: 'Hoofdstad', status: 'Geschreven' },
                // Groningen
                { city: 'Groningen', province: 'Groningen', views: '2.445', score: '97/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Delfzijl', province: 'Groningen', views: '678', score: '89/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Veendam', province: 'Groningen', views: '543', score: '88/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Winschoten', province: 'Groningen', views: '432', score: '87/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Stadskanaal', province: 'Groningen', views: '567', score: '90/100', type: 'Hoofdstad', status: 'Geschreven' },
                // Friesland
                { city: 'Leeuwarden', province: 'Friesland', views: '1.789', score: '95/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Drachten', province: 'Friesland', views: '1.234', score: '93/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Sneek', province: 'Friesland', views: '876', score: '91/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Heerenveen', province: 'Friesland', views: '654', score: '89/100', type: 'Hoofdstad', status: 'Geschreven' },
                { city: 'Harlingen', province: 'Friesland', views: '543', score: '88/100', type: 'Hoofdstad', status: 'Geschreven' },
                // Servicegebieden
                { city: 'Roden', province: 'Drenthe', views: '342', score: '89/100', type: 'Servicegebied', status: 'Geschreven' },
                { city: 'Klazienaveen', province: 'Drenthe', views: '267', score: '88/100', type: 'Servicegebied', status: 'Geschreven' },
                { city: 'Norg', province: 'Drenthe', views: '198', score: '87/100', type: 'Servicegebied', status: 'Geschreven' },
                { city: 'Peelo', province: 'Drenthe', views: '156', score: '86/100', type: 'Servicegebied', status: 'Geschreven' },
                { city: 'Ubbena', province: 'Drenthe', views: '134', score: '85/100', type: 'Servicegebied', status: 'Geschreven' }
              ].map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-dark-700/50 rounded-lg hover:bg-dark-600/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-500/10 p-2 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary-500" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{page.city}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          page.type === 'Hoofdstad' 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {page.type}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          page.status === 'Geschreven' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {page.status}
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(Math.floor(parseInt(page.score.split('/')[0]) / 20))].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-green-400 fill-current" />
                          ))}
                          {[...Array(5 - Math.floor(parseInt(page.score.split('/')[0]) / 20))].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-gray-600" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white font-medium">{page.views} views</p>
                    <p className="text-xs text-green-400">{page.score}</p>
                    <p className="text-xs text-secondary-400">{page.province}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-dark-600/50">
              <a href="/dashboard/seo" className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center space-x-2 group">
                <span>Bekijk alle SEO landingspagina's</span>
                <Eye className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recente Aanvragen */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Recente Aanvragen</h2>
              <Inbox className="h-5 w-5 text-primary-500" />
            </div>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div 
                  key={lead.id} 
                  className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg hover:bg-dark-600/50 transition-colors cursor-pointer group"
                  onClick={() => handleLeadClick(lead)}
                >
                  <div>
                    <p className="font-medium text-white group-hover:text-primary-400 transition-colors">{lead.naam}</p>
                    <p className="text-sm text-secondary-400">{lead.voertuig}</p>
                    <p className="text-xs text-primary-400">{lead.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-secondary-400">{lead.datum}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        lead.status === 'Nieuw' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : lead.status === 'In behandeling'
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {lead.status}
                      </span>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        lead.prioriteit === 'Hoog' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {lead.prioriteit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-dark-600/50">
              <a href="/dashboard/leads" className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center space-x-2 group">
                <span>Bekijk alle aanvragen</span>
                <Eye className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Komende Afspraken */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Komende Afspraken</h2>
              <Calendar className="h-5 w-5 text-primary-500" />
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg hover:bg-dark-600/50 transition-colors cursor-pointer group"
                  onClick={() => handleAppointmentClick(appointment)}
                >
                  <div>
                    <p className="font-medium text-white group-hover:text-primary-400 transition-colors">{appointment.klant}</p>
                    <p className="text-sm text-secondary-400">{appointment.voertuig}</p>
                    <p className="text-xs text-primary-400">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white font-medium">{appointment.datum}</p>
                    <p className="text-sm text-secondary-400">{appointment.tijd}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                      appointment.status === 'Bevestigd' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-dark-600/50">
              <a href="/dashboard/afspraken" className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center space-x-2 group">
                <span>Bekijk alle afspraken</span>
                <Eye className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recente Tunings */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Recente Tunings</h2>
              <Zap className="h-5 w-5 text-primary-500" />
            </div>
            <div className="space-y-4">
              {recentTunings.map((tuning) => (
                <div 
                  key={tuning.id} 
                  className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg hover:bg-dark-600/50 transition-colors cursor-pointer group"
                  onClick={() => handleTuningClick(tuning)}
                >
                  <div>
                    <p className="font-medium text-white group-hover:text-primary-400 transition-colors">{tuning.klant}</p>
                    <p className="text-sm text-secondary-400">{tuning.voertuig}</p>
                    <p className="text-xs text-primary-400">{tuning.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-secondary-400">{tuning.datum}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                      tuning.status === 'Voltooid' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {tuning.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-dark-600/50">
              <a href="/dashboard/voertuigen" className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center space-x-2 group">
                <span>Bekijk alle voertuigen</span>
                <Eye className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Performance Overzicht */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Performance Overzicht</h2>
              <TrendingUp className="h-5 w-5 text-primary-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">Gemiddelde Power Gain</p>
                  <p className="text-sm text-secondary-400">Alle voertuigen</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">+28%</p>
                  <p className="text-sm text-secondary-400">HP toename</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">Gemiddelde Torque Gain</p>
                  <p className="text-sm text-secondary-400">Alle voertuigen</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-400">+32%</p>
                  <p className="text-sm text-secondary-400">Nm toename</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">Tevredenheid Score</p>
                  <p className="text-sm text-secondary-400">Klant feedback</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <p className="text-2xl font-bold text-yellow-400">4.8</p>
                    <Star className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="text-sm text-secondary-400">Gemiddelde rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">Snelle Acties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/dashboard/leads" className="flex items-center space-x-3 p-4 bg-dark-700/50 rounded-lg hover:bg-dark-600/50 transition-colors">
              <Inbox className="h-6 w-6 text-orange-500" />
              <div>
                <p className="font-medium text-white">Nieuwe Aanvragen</p>
                <p className="text-sm text-secondary-400">23 ongelezen</p>
              </div>
            </a>
            <a href="/dashboard/voertuigen" className="flex items-center space-x-3 p-4 bg-dark-700/50 rounded-lg hover:bg-dark-600/50 transition-colors">
              <Car className="h-6 w-6 text-blue-500" />
              <div>
                <p className="font-medium text-white">Voertuigen</p>
                <p className="text-sm text-secondary-400">247 totaal</p>
              </div>
            </a>
            <a href="/dashboard/afspraken" className="flex items-center space-x-3 p-4 bg-dark-700/50 rounded-lg hover:bg-dark-600/50 transition-colors">
              <Calendar className="h-6 w-6 text-purple-500" />
              <div>
                <p className="font-medium text-white">Afspraken</p>
                <p className="text-sm text-secondary-400">8 vandaag</p>
              </div>
            </a>
            <a href="/dashboard/tuning" className="flex items-center space-x-3 p-4 bg-dark-700/50 rounded-lg hover:bg-dark-600/50 transition-colors">
              <Zap className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="font-medium text-white">Tuning Bestanden</p>
                <p className="text-sm text-secondary-400">156 beschikbaar</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}