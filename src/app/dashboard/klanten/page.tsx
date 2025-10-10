'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Users, Plus, Search, Filter, MoreVertical, Mail, Phone, Eye, Edit, Trash2, Car, Calendar, DollarSign, X, MessageSquare, UserPlus } from 'lucide-react'

const initialKlanten = [
  {
    id: 1,
    naam: 'Jan Jansen',
    email: 'jan.jansen@email.nl',
    telefoon: '+31 6 12345678',
    adres: 'Hoofdstraat 123, 1234 AB Amsterdam',
    geboortedatum: '1985-03-15',
    voertuigen: 2,
    laatsteBezoek: '2024-01-15',
    status: 'Actief',
    totaalBesteed: '€1,250',
    klantSinds: '2023-06-10',
    voorkeurContact: 'Email',
    opmerkingen: 'Tevreden klant, geïnteresseerd in stage 2 tuning voor zijn BMW.',
    voertuigLijst: [
      { id: 1, merk: 'BMW', model: '320d', kenteken: 'AB-123-C', status: 'Getuned' },
      { id: 2, merk: 'Audi', model: 'A4', kenteken: 'XY-789-Z', status: 'In behandeling' }
    ]
  },
  {
    id: 2,
    naam: 'Piet de Vries',
    email: 'piet.devries@email.nl',
    telefoon: '+31 6 23456789',
    adres: 'Kerkstraat 45, 5678 CD Rotterdam',
    geboortedatum: '1990-07-22',
    voertuigen: 1,
    laatsteBezoek: '2024-01-14',
    status: 'Actief',
    totaalBesteed: '€850',
    klantSinds: '2023-09-15',
    voorkeurContact: 'Telefoon',
    opmerkingen: 'Nieuwe klant, eerste tuning ervaring.',
    voertuigLijst: [
      { id: 3, merk: 'Volkswagen', model: 'Golf GTI', kenteken: 'FG-789-H', status: 'Getuned' }
    ]
  },
  {
    id: 3,
    naam: 'Klaas Bakker',
    email: 'klaas.bakker@email.nl',
    telefoon: '+31 6 34567890',
    adres: 'Industrieweg 78, 9012 EF Utrecht',
    geboortedatum: '1982-11-08',
    voertuigen: 3,
    laatsteBezoek: '2024-01-13',
    status: 'Actief',
    totaalBesteed: '€2,100',
    klantSinds: '2022-12-03',
    voorkeurContact: 'Email',
    opmerkingen: 'Vaste klant, heeft al meerdere voertuigen laten tunen. Zeer tevreden.',
    voertuigLijst: [
      { id: 4, merk: 'Mercedes', model: 'C200', kenteken: 'IJ-012-K', status: 'Getuned' },
      { id: 5, merk: 'BMW', model: 'M3', kenteken: 'KL-345-M', status: 'Getuned' },
      { id: 6, merk: 'Audi', model: 'RS6', kenteken: 'NO-678-P', status: 'Wachtend' }
    ]
  },
  {
    id: 4,
    naam: 'Marieke Smit',
    email: 'marieke.smit@email.nl',
    telefoon: '+31 6 45678901',
    adres: 'Dorpsstraat 12, 3456 GH Den Haag',
    geboortedatum: '1988-04-30',
    voertuigen: 1,
    laatsteBezoek: '2024-01-12',
    status: 'Actief',
    totaalBesteed: '€750',
    klantSinds: '2023-11-20',
    voorkeurContact: 'Email',
    opmerkingen: 'Voorzichtige klant, wil conservatieve tuning.',
    voertuigLijst: [
      { id: 7, merk: 'Volvo', model: 'V60 D4', kenteken: 'QR-901-S', status: 'Getuned' }
    ]
  },
  {
    id: 5,
    naam: 'Hans Visser',
    email: 'hans.visser@email.nl',
    telefoon: '+31 6 56789012',
    adres: 'Molenweg 34, 6789 IJ Eindhoven',
    geboortedatum: '1975-12-14',
    voertuigen: 0,
    laatsteBezoek: '2024-01-11',
    status: 'Inactief',
    totaalBesteed: '€0',
    klantSinds: '2023-08-05',
    voorkeurContact: 'Telefoon',
    opmerkingen: 'Potentiële klant, nog geen voertuig geregistreerd.',
    voertuigLijst: []
  }
]

const statusColors = {
  'Actief': 'bg-green-500/20 text-green-400',
  'Inactief': 'bg-gray-500/20 text-gray-400',
  'VIP': 'bg-purple-500/20 text-purple-400'
}

export default function KlantenPage() {
  const [klanten, setKlanten] = useState(initialKlanten)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [voertuigFilter, setVoertuigFilter] = useState('')
  const [selectedKlant, setSelectedKlant] = useState<typeof klanten[0] | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [showNewKlantModal, setShowNewKlantModal] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Filter klanten based on search and filters
  const filteredKlanten = klanten.filter(klant => {
    const matchesSearch = searchTerm === '' || 
      klant.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      klant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      klant.telefoon.includes(searchTerm)
    
    const matchesStatus = statusFilter === '' || klant.status === statusFilter
    const matchesVoertuig = voertuigFilter === '' || 
      (voertuigFilter === '0' && klant.voertuigen === 0) ||
      (voertuigFilter === '1' && klant.voertuigen === 1) ||
      (voertuigFilter === '2+' && klant.voertuigen >= 2)
    
    return matchesSearch && matchesStatus && matchesVoertuig
  })

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleKlantClick = (klant: typeof klanten[0]) => {
    setSelectedKlant(klant)
    setShowDetailModal(true)
  }

  const handleEditClick = (klant: typeof klanten[0]) => {
    setSelectedKlant(klant)
    setShowEditModal(true)
  }

  const handleDeleteClick = (klantId: number) => {
    setShowDeleteConfirm(klantId)
  }

  const handleDeleteKlant = (klantId: number) => {
    setKlanten(prevKlanten => prevKlanten.filter(klant => klant.id !== klantId))
    setShowDeleteConfirm(null)
    showNotification(`Klant succesvol verwijderd`, 'success')
  }

  const handleNewKlant = () => {
    setShowNewKlantModal(true)
  }

  const handleEmailClick = (email: string) => {
    window.open(`mailto:${email}?subject=Ziptuning Noord - Vraag`, '_blank')
    showNotification(`Email client geopend voor ${email}`, 'success')
  }

  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`, '_blank')
    showNotification(`Telefoon app geopend voor ${phone}`, 'success')
  }

  const closeModal = () => {
    setShowDetailModal(false)
    setShowEditModal(false)
    setShowNewKlantModal(false)
    setSelectedKlant(null)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setStatusFilter('')
    setVoertuigFilter('')
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
            <h1 className="text-3xl font-bold text-white">Klanten</h1>
            <p className="text-secondary-400 mt-2">
              Beheer alle klanten en hun voertuigen
            </p>
          </div>
          <button 
            onClick={handleNewKlant}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nieuwe Klant</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700/50">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Zoek klanten..."
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
              <option value="Actief">Actief</option>
              <option value="Inactief">Inactief</option>
              <option value="VIP">VIP</option>
            </select>
            <select 
              value={voertuigFilter}
              onChange={(e) => setVoertuigFilter(e.target.value)}
              className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Alle Voertuigen</option>
              <option value="0">0 voertuigen</option>
              <option value="1">1 voertuig</option>
              <option value="2+">2+ voertuigen</option>
            </select>
            <button 
              onClick={resetFilters}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-secondary-300 hover:text-white transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-secondary-400 text-sm">
          {filteredKlanten.length} van {klanten.length} klanten gevonden
        </div>

        {/* Klanten Tabel */}
        <div className="bg-dark-800 rounded-lg border border-dark-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Klant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Voertuigen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Totaal Besteed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Laatste Bezoek
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {filteredKlanten.map((klant) => (
                  <tr key={klant.id} className="hover:bg-dark-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className="flex items-center cursor-pointer hover:text-primary-400 transition-colors"
                        onClick={() => handleKlantClick(klant)}
                      >
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {klant.naam}
                          </div>
                          <div className="text-sm text-secondary-400">
                            ID: {klant.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        <div 
                          className="flex items-center space-x-2 cursor-pointer hover:text-white transition-colors"
                          onClick={() => handleEmailClick(klant.email)}
                        >
                          <Mail className="h-4 w-4 text-secondary-400" />
                          <span>{klant.email}</span>
                        </div>
                        <div 
                          className="flex items-center space-x-2 mt-1 cursor-pointer hover:text-white transition-colors"
                          onClick={() => handlePhoneClick(klant.telefoon)}
                        >
                          <Phone className="h-4 w-4 text-secondary-400" />
                          <span className="text-secondary-400">{klant.telefoon}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {klant.voertuigen} voertuig{klant.voertuigen !== 1 ? 'en' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[klant.status as keyof typeof statusColors]}`}>
                        {klant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-medium">
                      {klant.totaalBesteed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-400">
                      {klant.laatsteBezoek}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleKlantClick(klant)}
                          className="text-secondary-400 hover:text-white transition-colors p-1"
                          title="Bekijken"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditClick(klant)}
                          className="text-secondary-400 hover:text-blue-400 transition-colors p-1"
                          title="Bewerken"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEmailClick(klant.email)}
                          className="text-secondary-400 hover:text-green-400 transition-colors p-1"
                          title="Email"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(klant.id)}
                          className="text-secondary-400 hover:text-red-400 transition-colors p-1"
                          title="Verwijderen"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Totaal Klanten</p>
                <p className="text-2xl font-bold text-white">{klanten.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Actieve Klanten</p>
                <p className="text-2xl font-bold text-white">{klanten.filter(k => k.status === 'Actief').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Car className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Totaal Voertuigen</p>
                <p className="text-2xl font-bold text-white">{klanten.reduce((sum, k) => sum + k.voertuigen, 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Totale Omzet</p>
                <p className="text-2xl font-bold text-white">€4,950</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedKlant && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xl">{selectedKlant.naam}</h3>
                    <p className="text-secondary-400">Klant ID: {selectedKlant.id}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="text-secondary-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Klant Informatie */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Persoonlijke Informatie</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Naam:</span>
                        <span className="text-white font-medium">{selectedKlant.naam}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Email:</span>
                        <span className="text-white">{selectedKlant.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Telefoon:</span>
                        <span className="text-white">{selectedKlant.telefoon}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Adres:</span>
                        <span className="text-white text-sm">{selectedKlant.adres}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Geboortedatum:</span>
                        <span className="text-white">{selectedKlant.geboortedatum}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Klant Details</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Status:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedKlant.status as keyof typeof statusColors]}`}>
                          {selectedKlant.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Klant sinds:</span>
                        <span className="text-white">{selectedKlant.klantSinds}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Voorkeur contact:</span>
                        <span className="text-primary-400">{selectedKlant.voorkeurContact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Laatste bezoek:</span>
                        <span className="text-white">{selectedKlant.laatsteBezoek}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Totaal besteed:</span>
                        <span className="text-green-400 font-medium">{selectedKlant.totaalBesteed}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voertuigen Overzicht */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Voertuigen ({selectedKlant.voertuigen})</h4>
                    {selectedKlant.voertuigLijst.length > 0 ? (
                      <div className="space-y-3">
                        {selectedKlant.voertuigLijst.map((voertuig) => (
                          <div key={voertuig.id} className="bg-dark-700 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-white font-medium">{voertuig.merk} {voertuig.model}</div>
                                <div className="text-secondary-400 text-sm">{voertuig.kenteken}</div>
                              </div>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                voertuig.status === 'Getuned' ? 'bg-green-500/20 text-green-400' :
                                voertuig.status === 'In behandeling' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {voertuig.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-dark-700 rounded-lg p-4 text-center">
                        <p className="text-secondary-400">Geen voertuigen geregistreerd</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Opmerkingen</h4>
                    <div className="bg-dark-700 rounded-lg p-4">
                      <p className="text-white leading-relaxed">{selectedKlant.opmerkingen}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actie Knoppen */}
              <div className="flex items-center space-x-4 pt-6 border-t border-dark-600">
                <button
                  onClick={() => handleEditClick(selectedKlant)}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Bewerken</span>
                </button>
                <button
                  onClick={() => handleEmailClick(selectedKlant.email)}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Email Sturen</span>
                </button>
                <button
                  onClick={() => handlePhoneClick(selectedKlant.telefoon)}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Bellen</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(selectedKlant.id)}
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
              <h3 className="text-white font-semibold text-lg mb-4">Klant Verwijderen</h3>
              <p className="text-secondary-400 mb-6">
                Weet je zeker dat je deze klant wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDeleteKlant(showDeleteConfirm)}
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
