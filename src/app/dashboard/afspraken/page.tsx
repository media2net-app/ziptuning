'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Calendar, Plus, Clock, MapPin, Car, Users, Eye, Edit, Trash2, CheckCircle, XCircle, Phone, Mail, X, Search, Filter, AlertCircle, TrendingUp } from 'lucide-react'

const initialAfspraken = [
  {
    id: 1,
    klant: 'Jan Jansen',
    klantEmail: 'jan.jansen@email.nl',
    klantTelefoon: '+31 6 12345678',
    voertuig: 'BMW 320d (2019)',
    kenteken: 'AB-123-C',
    type: 'Stage 1 Tuning',
    datum: '2024-01-20',
    tijd: '09:00 - 11:00',
    status: 'Bevestigd',
    locatie: 'Werkplaats Noord',
    opmerkingen: 'Klant heeft specifieke wensen voor de tuning. Zorg voor conservatieve instellingen.',
    verwachteDuur: '2 uur',
    technicus: 'Mark Tuning',
    prioriteit: 'Normaal',
    kosten: '€450',
    betalingsStatus: 'Vooruitbetaald',
    voertuigKilometers: '45,000 km',
    laatsteService: '2023-12-15',
    specialeWensen: 'Conservatieve tuning voor dagelijks gebruik'
  },
  {
    id: 2,
    klant: 'Piet de Vries',
    klantEmail: 'piet.devries@email.nl',
    klantTelefoon: '+31 6 23456789',
    voertuig: 'Audi A4 2.0 TDI',
    kenteken: 'CD-456-E',
    type: 'Stage 2 Tuning',
    datum: '2024-01-20',
    tijd: '13:00 - 15:00',
    status: 'Bevestigd',
    locatie: 'Werkplaats Noord',
    opmerkingen: 'Stage 2 tuning met downpipe. Zorg voor goede afstemming.',
    verwachteDuur: '3 uur',
    technicus: 'Lisa Performance',
    prioriteit: 'Hoog',
    kosten: '€750',
    betalingsStatus: 'Vooruitbetaald',
    voertuigKilometers: '32,000 km',
    laatsteService: '2024-01-05',
    specialeWensen: 'Maximale performance tuning'
  },
  {
    id: 3,
    klant: 'Klaas Bakker',
    klantEmail: 'klaas.bakker@email.nl',
    klantTelefoon: '+31 6 34567890',
    voertuig: 'Volkswagen Golf GTI',
    kenteken: 'FG-789-H',
    type: 'ECU Tuning',
    datum: '2024-01-21',
    tijd: '10:00 - 12:00',
    status: 'Bevestigd',
    locatie: 'Werkplaats Noord',
    opmerkingen: 'ECU tuning voor Golf GTI. Standaard procedure.',
    verwachteDuur: '2.5 uur',
    technicus: 'Tom ECU',
    prioriteit: 'Normaal',
    kosten: '€550',
    betalingsStatus: 'Vooruitbetaald',
    voertuigKilometers: '28,000 km',
    laatsteService: '2023-11-20',
    specialeWensen: 'Balans tussen performance en betrouwbaarheid'
  },
  {
    id: 4,
    klant: 'Marieke Smit',
    klantEmail: 'marieke.smit@email.nl',
    klantTelefoon: '+31 6 45678901',
    voertuig: 'Mercedes C200',
    kenteken: 'IJ-012-K',
    type: 'Stage 1 Tuning',
    datum: '2024-01-22',
    tijd: '14:00 - 16:00',
    status: 'Wachtend',
    locatie: 'Werkplaats Noord',
    opmerkingen: 'Wacht op bevestiging van klant. Mogelijk uitstel.',
    verwachteDuur: '2 uur',
    technicus: 'Mark Tuning',
    prioriteit: 'Laag',
    kosten: '€450',
    betalingsStatus: 'Nog niet betaald',
    voertuigKilometers: '67,000 km',
    laatsteService: '2023-10-10',
    specialeWensen: 'Voorzichtige tuning voor oudere auto'
  },
  {
    id: 5,
    klant: 'Hans Visser',
    klantEmail: 'hans.visser@email.nl',
    klantTelefoon: '+31 6 56789012',
    voertuig: 'Volvo V60 D4',
    kenteken: 'LM-345-N',
    type: 'Stage 1 Tuning',
    datum: '2024-01-23',
    tijd: '11:00 - 13:00',
    status: 'Wachtend',
    locatie: 'Werkplaats Noord',
    opmerkingen: 'Eerste keer tuning voor deze klant. Uitgebreide uitleg nodig.',
    verwachteDuur: '2.5 uur',
    technicus: 'Lisa Performance',
    prioriteit: 'Normaal',
    kosten: '€450',
    betalingsStatus: 'Nog niet betaald',
    voertuigKilometers: '89,000 km',
    laatsteService: '2023-09-15',
    specialeWensen: 'Uitgebreide uitleg over tuning proces'
  }
]

const statusColors = {
  'Bevestigd': 'bg-green-500/20 text-green-400',
  'Wachtend': 'bg-orange-500/20 text-orange-400',
  'Geannuleerd': 'bg-red-500/20 text-red-400',
  'Voltooid': 'bg-blue-500/20 text-blue-400'
}

const prioriteitColors = {
  'Hoog': 'bg-red-500/20 text-red-400',
  'Normaal': 'bg-yellow-500/20 text-yellow-400',
  'Laag': 'bg-green-500/20 text-green-400'
}

export default function AfsprakenPage() {
  const [afspraken, setAfspraken] = useState(initialAfspraken)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [datumFilter, setDatumFilter] = useState('')
  const [selectedAfspraak, setSelectedAfspraak] = useState<typeof afspraken[0] | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [showNewAfspraakModal, setShowNewAfspraakModal] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]
  const vandaagAfspraken = afspraken.filter(afspraak => afspraak.datum === today)

  // Filter afspraken based on search and filters
  const filteredAfspraken = afspraken.filter(afspraak => {
    const matchesSearch = searchTerm === '' || 
      afspraak.klant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      afspraak.voertuig.toLowerCase().includes(searchTerm.toLowerCase()) ||
      afspraak.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === '' || afspraak.status === statusFilter
    const matchesDatum = datumFilter === '' || afspraak.datum === datumFilter
    
    return matchesSearch && matchesStatus && matchesDatum
  })

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAfspraakClick = (afspraak: typeof afspraken[0]) => {
    setSelectedAfspraak(afspraak)
    setShowDetailModal(true)
  }

  const handleEditClick = (afspraak: typeof afspraken[0]) => {
    setSelectedAfspraak(afspraak)
    setShowEditModal(true)
  }

  const handleDeleteClick = (afspraakId: number) => {
    setShowDeleteConfirm(afspraakId)
  }

  const handleDeleteAfspraak = (afspraakId: number) => {
    setAfspraken(prevAfspraken => prevAfspraken.filter(afspraak => afspraak.id !== afspraakId))
    setShowDeleteConfirm(null)
    showNotification(`Afspraak succesvol verwijderd`, 'success')
  }

  const handleNewAfspraak = () => {
    setShowNewAfspraakModal(true)
  }

  const handleStatusChange = (afspraakId: number, newStatus: string) => {
    setAfspraken(prevAfspraken => 
      prevAfspraken.map(afspraak => 
        afspraak.id === afspraakId ? { ...afspraak, status: newStatus } : afspraak
      )
    )
    showNotification(`Status van afspraak gewijzigd naar ${newStatus}`, 'success')
  }

  const handleEmailKlant = (email: string) => {
    window.open(`mailto:${email}?subject=Afspraak Bevestiging`, '_blank')
    showNotification(`Email client geopend voor ${email}`, 'success')
  }

  const handlePhoneKlant = (phone: string) => {
    window.open(`tel:${phone}`, '_blank')
    showNotification(`Telefoon app geopend voor ${phone}`, 'success')
  }

  const closeModal = () => {
    setShowDetailModal(false)
    setShowEditModal(false)
    setShowNewAfspraakModal(false)
    setSelectedAfspraak(null)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setStatusFilter('')
    setDatumFilter('')
    showNotification('Alle filters gereset', 'success')
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
            <h1 className="text-3xl font-bold text-white">Afspraken</h1>
            <p className="text-secondary-400 mt-2">
              Beheer alle tuning afspraken en planning
            </p>
          </div>
          <button 
            onClick={handleNewAfspraak}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nieuwe Afspraak</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700/50">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Zoek afspraken..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Alle Statussen</option>
              <option value="Bevestigd">Bevestigd</option>
              <option value="Wachtend">Wachtend</option>
              <option value="Geannuleerd">Geannuleerd</option>
              <option value="Voltooid">Voltooid</option>
            </select>
            <input
              type="date"
              value={datumFilter}
              onChange={(e) => setDatumFilter(e.target.value)}
              className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button 
              onClick={resetFilters}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-secondary-300 hover:text-white transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Vandaag Overzicht */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-primary-500" />
              <h2 className="text-xl font-semibold text-white">Vandaag ({new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })})</h2>
            </div>
            <div className="text-secondary-400 text-sm">
              {vandaagAfspraken.length} afspraak{vandaagAfspraken.length !== 1 ? 'en' : ''} vandaag
            </div>
          </div>
          
          {vandaagAfspraken.length > 0 ? (
            <div className="space-y-4">
              {vandaagAfspraken.map((afspraak) => (
                <div key={afspraak.id} className="bg-dark-700 rounded-lg p-4 border-l-4 border-primary-500 hover:border-primary-400 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <Car className="h-6 w-6 text-primary-500" />
                      </div>
                      <div>
                        <h3 
                          className="text-white font-medium cursor-pointer hover:text-primary-400 transition-colors"
                          onClick={() => handleAfspraakClick(afspraak)}
                        >
                          {afspraak.klant}
                        </h3>
                        <p className="text-secondary-400 text-sm">{afspraak.voertuig}</p>
                        <p className="text-primary-400 text-sm font-medium">{afspraak.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-sm text-white">
                        <Clock className="h-4 w-4 text-secondary-400" />
                        <span>{afspraak.tijd}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-secondary-400 mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{afspraak.locatie}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${statusColors[afspraak.status as keyof typeof statusColors]}`}>
                          {afspraak.status}
                        </span>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${prioriteitColors[afspraak.prioriteit as keyof typeof prioriteitColors]}`}>
                          {afspraak.prioriteit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-dark-600">
                    <button 
                      onClick={() => handleAfspraakClick(afspraak)}
                      className="text-secondary-400 hover:text-white transition-colors p-1"
                      title="Bekijken"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleEditClick(afspraak)}
                      className="text-secondary-400 hover:text-blue-400 transition-colors p-1"
                      title="Bewerken"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleEmailKlant(afspraak.klantEmail)}
                      className="text-secondary-400 hover:text-green-400 transition-colors p-1"
                      title="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handlePhoneKlant(afspraak.klantTelefoon)}
                      className="text-secondary-400 hover:text-blue-400 transition-colors p-1"
                      title="Bellen"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary-400">Geen afspraken vandaag</p>
          )}
        </div>

        {/* Komende Afspraken */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Komende Afspraken</h2>
            <div className="text-secondary-400 text-sm">
              {filteredAfspraken.filter(afspraak => afspraak.datum !== today).length} komende afspraken
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredAfspraken.filter(afspraak => afspraak.datum !== today).map((afspraak) => (
              <div key={afspraak.id} className="bg-dark-700 rounded-lg p-4 hover:bg-dark-600 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 
                        className="text-white font-medium cursor-pointer hover:text-primary-400 transition-colors"
                        onClick={() => handleAfspraakClick(afspraak)}
                      >
                        {afspraak.klant}
                      </h3>
                      <p className="text-secondary-400 text-sm">{afspraak.voertuig}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white font-medium">{afspraak.datum}</div>
                    <div className="text-sm text-secondary-400">{afspraak.tijd}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${statusColors[afspraak.status as keyof typeof statusColors]}`}>
                        {afspraak.status}
                      </span>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${prioriteitColors[afspraak.prioriteit as keyof typeof prioriteitColors]}`}>
                        {afspraak.prioriteit}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-dark-600">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-400">Type:</span>
                    <span className="text-primary-400 font-medium">{afspraak.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-secondary-400">Locatie:</span>
                    <span className="text-white">{afspraak.locatie}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-secondary-400">Technicus:</span>
                    <span className="text-white">{afspraak.technicus}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-dark-600">
                  <button 
                    onClick={() => handleAfspraakClick(afspraak)}
                    className="text-secondary-400 hover:text-white transition-colors p-1"
                    title="Bekijken"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleEditClick(afspraak)}
                    className="text-secondary-400 hover:text-blue-400 transition-colors p-1"
                    title="Bewerken"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleEmailKlant(afspraak.klantEmail)}
                    className="text-secondary-400 hover:text-green-400 transition-colors p-1"
                    title="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handlePhoneKlant(afspraak.klantTelefoon)}
                    className="text-secondary-400 hover:text-blue-400 transition-colors p-1"
                    title="Bellen"
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistieken */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Deze Week</p>
                <p className="text-2xl font-bold text-white">{afspraken.filter(a => {
                  const afspraakDate = new Date(a.datum)
                  const today = new Date()
                  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                  return afspraakDate >= today && afspraakDate <= weekFromNow
                }).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Gemiddelde Duur</p>
                <p className="text-2xl font-bold text-white">2.4u</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Wachtend</p>
                <p className="text-2xl font-bold text-white">{afspraken.filter(a => a.status === 'Wachtend').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Bevestigd</p>
                <p className="text-2xl font-bold text-white">{afspraken.filter(a => a.status === 'Bevestigd').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedAfspraak && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xl">{selectedAfspraak.klant}</h3>
                    <p className="text-secondary-400">{selectedAfspraak.voertuig} • {selectedAfspraak.type}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="text-secondary-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Afspraak Informatie */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Afspraak Details</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Datum:</span>
                        <span className="text-white font-medium">{selectedAfspraak.datum}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Tijd:</span>
                        <span className="text-white">{selectedAfspraak.tijd}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Locatie:</span>
                        <span className="text-white">{selectedAfspraak.locatie}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Status:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedAfspraak.status as keyof typeof statusColors]}`}>
                          {selectedAfspraak.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Prioriteit:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${prioriteitColors[selectedAfspraak.prioriteit as keyof typeof prioriteitColors]}`}>
                          {selectedAfspraak.prioriteit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Technicus:</span>
                        <span className="text-white">{selectedAfspraak.technicus}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Klant Informatie</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Naam:</span>
                        <span className="text-white font-medium">{selectedAfspraak.klant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Email:</span>
                        <span className="text-white">{selectedAfspraak.klantEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Telefoon:</span>
                        <span className="text-white">{selectedAfspraak.klantTelefoon}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voertuig & Financiële Informatie */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Voertuig Informatie</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Voertuig:</span>
                        <span className="text-white font-medium">{selectedAfspraak.voertuig}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Kenteken:</span>
                        <span className="text-white font-mono">{selectedAfspraak.kenteken}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Kilometers:</span>
                        <span className="text-white">{selectedAfspraak.voertuigKilometers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Laatste service:</span>
                        <span className="text-white">{selectedAfspraak.laatsteService}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Financiële Informatie</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Kosten:</span>
                        <span className="text-green-400 font-medium">{selectedAfspraak.kosten}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Betalingsstatus:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedAfspraak.betalingsStatus === 'Vooruitbetaald' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {selectedAfspraak.betalingsStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Verwachte duur:</span>
                        <span className="text-white">{selectedAfspraak.verwachteDuur}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opmerkingen & Speciale Wensen */}
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Opmerkingen</h4>
                  <div className="bg-dark-700 rounded-lg p-4">
                    <p className="text-white leading-relaxed">{selectedAfspraak.opmerkingen}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Speciale Wensen</h4>
                  <div className="bg-dark-700 rounded-lg p-4">
                    <p className="text-white leading-relaxed">{selectedAfspraak.specialeWensen}</p>
                  </div>
                </div>
              </div>

              {/* Actie Knoppen */}
              <div className="flex items-center space-x-4 pt-6 border-t border-dark-600">
                <button
                  onClick={() => handleEditClick(selectedAfspraak)}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Bewerken</span>
                </button>
                <button
                  onClick={() => handleEmailKlant(selectedAfspraak.klantEmail)}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Klant</span>
                </button>
                <button
                  onClick={() => handlePhoneKlant(selectedAfspraak.klantTelefoon)}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Bellen</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(selectedAfspraak.id)}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Verwijderen</span>
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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 max-w-md w-full mx-4">
              <h3 className="text-white font-semibold text-lg mb-4">Afspraak Verwijderen</h3>
              <p className="text-secondary-400 mb-6">
                Weet je zeker dat je deze afspraak wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDeleteAfspraak(showDeleteConfirm)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Verwijderen
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Annuleren
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
