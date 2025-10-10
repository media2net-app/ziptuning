'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Car, Plus, Search, Filter, MoreVertical, Eye, Edit, Trash2, Download, Settings, X, Calendar, Zap, TrendingUp } from 'lucide-react'

const initialVoertuigen = [
  {
    id: 1,
    merk: 'BMW',
    model: '320d',
    jaar: 2019,
    kenteken: 'AB-123-C',
    klant: 'Jan Jansen',
    klantEmail: 'jan.jansen@email.nl',
    klantTelefoon: '+31 6 11111111',
    tuningStatus: 'Getuned',
    powerGain: '+28%',
    torqueGain: '+32%',
    originelePower: '190 PK',
    origineleTorque: '400 Nm',
    nieuwePower: '243 PK',
    nieuweTorque: '528 Nm',
    laatsteUpdate: '2024-01-15',
    tuningDatum: '2024-01-10',
    tuningType: 'Stage 1',
    opmerkingen: 'Uitstekende resultaten behaald. Klant zeer tevreden.',
    tuningBestand: 'BMW_320d_2019_Stage1_v1.2.zip'
  },
  {
    id: 2,
    merk: 'Audi',
    model: 'A4 2.0 TDI',
    jaar: 2020,
    kenteken: 'CD-456-E',
    klant: 'Piet de Vries',
    klantEmail: 'piet.devries@email.nl',
    klantTelefoon: '+31 6 22222222',
    tuningStatus: 'In behandeling',
    powerGain: '-',
    torqueGain: '-',
    originelePower: '150 PK',
    origineleTorque: '320 Nm',
    nieuwePower: '-',
    nieuweTorque: '-',
    laatsteUpdate: '2024-01-14',
    tuningDatum: '-',
    tuningType: 'Stage 1',
    opmerkingen: 'Tuning in ontwikkeling. Verwacht resultaat: +25% power, +30% torque.',
    tuningBestand: '-'
  },
  {
    id: 3,
    merk: 'Volkswagen',
    model: 'Golf GTI',
    jaar: 2018,
    kenteken: 'FG-789-H',
    klant: 'Klaas Bakker',
    klantEmail: 'klaas.bakker@email.nl',
    klantTelefoon: '+31 6 33333333',
    tuningStatus: 'Getuned',
    powerGain: '+35%',
    torqueGain: '+38%',
    originelePower: '220 PK',
    origineleTorque: '350 Nm',
    nieuwePower: '297 PK',
    nieuweTorque: '483 Nm',
    laatsteUpdate: '2024-01-13',
    tuningDatum: '2024-01-08',
    tuningType: 'Stage 2',
    opmerkingen: 'Stage 2 tuning met downpipe en intercooler. Spectaculaire resultaten!',
    tuningBestand: 'VW_Golf_GTI_2018_Stage2_v2.1.zip'
  },
  {
    id: 4,
    merk: 'Mercedes',
    model: 'C200',
    jaar: 2021,
    kenteken: 'IJ-012-K',
    klant: 'Marieke Smit',
    klantEmail: 'marieke.smit@email.nl',
    klantTelefoon: '+31 6 44444444',
    tuningStatus: 'Getuned',
    powerGain: '+25%',
    torqueGain: '+30%',
    originelePower: '197 PK',
    origineleTorque: '280 Nm',
    nieuwePower: '246 PK',
    nieuweTorque: '364 Nm',
    laatsteUpdate: '2024-01-12',
    tuningDatum: '2024-01-05',
    tuningType: 'Stage 1',
    opmerkingen: 'Conservatieve tuning voor dagelijks gebruik. Klant zeer tevreden.',
    tuningBestand: 'MB_C200_2021_Stage1_v1.0.zip'
  },
  {
    id: 5,
    merk: 'Volvo',
    model: 'V60 D4',
    jaar: 2020,
    kenteken: 'LM-345-N',
    klant: 'Hans Visser',
    klantEmail: 'hans.visser@email.nl',
    klantTelefoon: '+31 6 55555555',
    tuningStatus: 'Wachtend',
    powerGain: '-',
    torqueGain: '-',
    originelePower: '190 PK',
    origineleTorque: '400 Nm',
    nieuwePower: '-',
    nieuweTorque: '-',
    laatsteUpdate: '2024-01-11',
    tuningDatum: '-',
    tuningType: 'Stage 1',
    opmerkingen: 'Wacht op goedkeuring van klant voor tuning.',
    tuningBestand: '-'
  }
]

const statusColors = {
  'Getuned': 'bg-green-500/20 text-green-400',
  'In behandeling': 'bg-orange-500/20 text-orange-400',
  'Wachtend': 'bg-gray-500/20 text-gray-400',
  'Geannuleerd': 'bg-red-500/20 text-red-400'
}

export default function VoertuigenPage() {
  const [voertuigen, setVoertuigen] = useState(initialVoertuigen)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [merkFilter, setMerkFilter] = useState('')
  const [selectedVoertuig, setSelectedVoertuig] = useState<typeof voertuigen[0] | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [showNewVoertuigModal, setShowNewVoertuigModal] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Filter voertuigen based on search and filters
  const filteredVoertuigen = voertuigen.filter(voertuig => {
    const matchesSearch = searchTerm === '' || 
      voertuig.merk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voertuig.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voertuig.kenteken.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voertuig.klant.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === '' || voertuig.tuningStatus === statusFilter
    const matchesMerk = merkFilter === '' || voertuig.merk === merkFilter
    
    return matchesSearch && matchesStatus && matchesMerk
  })

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleVoertuigClick = (voertuig: typeof voertuigen[0]) => {
    setSelectedVoertuig(voertuig)
    setShowDetailModal(true)
  }

  const handleEditClick = (voertuig: typeof voertuigen[0]) => {
    setSelectedVoertuig(voertuig)
    setShowEditModal(true)
  }

  const handleDeleteClick = (voertuigId: number) => {
    setShowDeleteConfirm(voertuigId)
  }

  const handleDeleteVoertuig = (voertuigId: number) => {
    setVoertuigen(prevVoertuigen => prevVoertuigen.filter(voertuig => voertuig.id !== voertuigId))
    setShowDeleteConfirm(null)
    showNotification(`Voertuig succesvol verwijderd`, 'success')
  }

  const handleDownloadTuning = (voertuig: typeof voertuigen[0]) => {
    if (voertuig.tuningBestand === '-') {
      showNotification('Geen tuning bestand beschikbaar', 'error')
      return
    }
    
    // Hier zou je normaal het bestand downloaden
    console.log('Downloading tuning file:', voertuig.tuningBestand)
    showNotification(`Tuning bestand ${voertuig.tuningBestand} wordt gedownload`, 'success')
  }

  const handleNewVoertuig = () => {
    setShowNewVoertuigModal(true)
  }

  const closeModal = () => {
    setShowDetailModal(false)
    setShowEditModal(false)
    setShowNewVoertuigModal(false)
    setSelectedVoertuig(null)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setStatusFilter('')
    setMerkFilter('')
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
            <h1 className="text-3xl font-bold text-white">Voertuigen</h1>
            <p className="text-secondary-400 mt-2">
              Beheer alle voertuigen in het chiptuning systeem
            </p>
          </div>
          <button 
            onClick={handleNewVoertuig}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nieuw Voertuig</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700/50">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Zoek voertuigen..."
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
              <option value="Getuned">Getuned</option>
              <option value="In behandeling">In behandeling</option>
              <option value="Wachtend">Wachtend</option>
              <option value="Geannuleerd">Geannuleerd</option>
            </select>
            <select 
              value={merkFilter}
              onChange={(e) => setMerkFilter(e.target.value)}
              className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Alle Merken</option>
              <option value="BMW">BMW</option>
              <option value="Audi">Audi</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Volvo">Volvo</option>
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
          {filteredVoertuigen.length} van {voertuigen.length} voertuigen gevonden
        </div>

        {/* Voertuigen Tabel */}
        <div className="bg-dark-800 rounded-lg border border-dark-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Voertuig
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Klant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Power Gain
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Torque Gain
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Laatste Update
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {filteredVoertuigen.map((voertuig) => (
                  <tr key={voertuig.id} className="hover:bg-dark-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className="flex items-center cursor-pointer hover:text-primary-400 transition-colors"
                        onClick={() => handleVoertuigClick(voertuig)}
                      >
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                          <Car className="h-5 w-5 text-primary-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {voertuig.merk} {voertuig.model}
                          </div>
                          <div className="text-sm text-secondary-400">
                            {voertuig.jaar} • {voertuig.kenteken}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {voertuig.klant}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[voertuig.tuningStatus as keyof typeof statusColors]}`}>
                        {voertuig.tuningStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-medium">
                      {voertuig.powerGain}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-medium">
                      {voertuig.torqueGain}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-400">
                      {voertuig.laatsteUpdate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleVoertuigClick(voertuig)}
                          className="text-secondary-400 hover:text-white transition-colors p-1"
                          title="Bekijken"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditClick(voertuig)}
                          className="text-secondary-400 hover:text-blue-400 transition-colors p-1"
                          title="Bewerken"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDownloadTuning(voertuig)}
                          className="text-secondary-400 hover:text-green-400 transition-colors p-1"
                          title="Download Tuning"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(voertuig.id)}
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
                <Car className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Totaal Voertuigen</p>
                <p className="text-2xl font-bold text-white">{voertuigen.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Getuned</p>
                <p className="text-2xl font-bold text-white">{voertuigen.filter(v => v.tuningStatus === 'Getuned').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">In behandeling</p>
                <p className="text-2xl font-bold text-white">{voertuigen.filter(v => v.tuningStatus === 'In behandeling').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Wachtend</p>
                <p className="text-2xl font-bold text-white">{voertuigen.filter(v => v.tuningStatus === 'Wachtend').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedVoertuig && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Car className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xl">{selectedVoertuig.merk} {selectedVoertuig.model}</h3>
                    <p className="text-secondary-400">{selectedVoertuig.jaar} • {selectedVoertuig.kenteken}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="text-secondary-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Voertuig Informatie */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Voertuig Informatie</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Merk & Model:</span>
                        <span className="text-white font-medium">{selectedVoertuig.merk} {selectedVoertuig.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Bouwjaar:</span>
                        <span className="text-white">{selectedVoertuig.jaar}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Kenteken:</span>
                        <span className="text-white font-mono">{selectedVoertuig.kenteken}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Tuning Status:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedVoertuig.tuningStatus as keyof typeof statusColors]}`}>
                          {selectedVoertuig.tuningStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Tuning Type:</span>
                        <span className="text-primary-400 font-medium">{selectedVoertuig.tuningType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Klant Informatie */}
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Klant Informatie</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Naam:</span>
                        <span className="text-white font-medium">{selectedVoertuig.klant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Email:</span>
                        <span className="text-white">{selectedVoertuig.klantEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Telefoon:</span>
                        <span className="text-white">{selectedVoertuig.klantTelefoon}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Data */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Performance Data</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-dark-600 rounded-lg">
                          <div className="text-secondary-400 text-sm">Originele Power</div>
                          <div className="text-white font-bold text-lg">{selectedVoertuig.originelePower}</div>
                        </div>
                        <div className="text-center p-3 bg-dark-600 rounded-lg">
                          <div className="text-secondary-400 text-sm">Nieuwe Power</div>
                          <div className="text-green-400 font-bold text-lg">{selectedVoertuig.nieuwePower}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-dark-600 rounded-lg">
                          <div className="text-secondary-400 text-sm">Originele Torque</div>
                          <div className="text-white font-bold text-lg">{selectedVoertuig.origineleTorque}</div>
                        </div>
                        <div className="text-center p-3 bg-dark-600 rounded-lg">
                          <div className="text-secondary-400 text-sm">Nieuwe Torque</div>
                          <div className="text-blue-400 font-bold text-lg">{selectedVoertuig.nieuweTorque}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dark-600">
                        <div className="text-center">
                          <div className="text-secondary-400 text-sm">Power Gain</div>
                          <div className="text-green-400 font-bold text-lg">{selectedVoertuig.powerGain}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-secondary-400 text-sm">Torque Gain</div>
                          <div className="text-blue-400 font-bold text-lg">{selectedVoertuig.torqueGain}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tuning Details */}
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Tuning Details</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Tuning Datum:</span>
                        <span className="text-white">{selectedVoertuig.tuningDatum}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Laatste Update:</span>
                        <span className="text-white">{selectedVoertuig.laatsteUpdate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Tuning Bestand:</span>
                        <span className="text-white font-mono text-sm">{selectedVoertuig.tuningBestand}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opmerkingen */}
              <div className="mt-6">
                <h4 className="text-white font-semibold text-lg mb-4">Opmerkingen</h4>
                <div className="bg-dark-700 rounded-lg p-4">
                  <p className="text-white leading-relaxed">{selectedVoertuig.opmerkingen}</p>
                </div>
              </div>

              {/* Actie Knoppen */}
              <div className="flex items-center space-x-4 pt-6 border-t border-dark-600">
                <button
                  onClick={() => handleEditClick(selectedVoertuig)}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Bewerken</span>
                </button>
                <button
                  onClick={() => handleDownloadTuning(selectedVoertuig)}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Tuning</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(selectedVoertuig.id)}
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
              <h3 className="text-white font-semibold text-lg mb-4">Voertuig Verwijderen</h3>
              <p className="text-secondary-400 mb-6">
                Weet je zeker dat je dit voertuig wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDeleteVoertuig(showDeleteConfirm)}
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
