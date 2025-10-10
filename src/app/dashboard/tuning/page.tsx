'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { FileText, Plus, Search, Filter, MoreVertical, Download, Eye, Trash2, Edit, Upload, Zap, TrendingUp, X, Settings, FileCode, Clock, CheckCircle } from 'lucide-react'

const initialTuningBestanden = [
  {
    id: 1,
    naam: 'BMW_320d_2019_Stage1',
    voertuig: 'BMW 320d (2019)',
    klant: 'Jan Jansen',
    klantEmail: 'jan.jansen@email.nl',
    type: 'Stage 1',
    bestandsgrootte: '2.4 MB',
    uploadDatum: '2024-01-15',
    status: 'Gereed',
    powerGain: '+28%',
    torqueGain: '+32%',
    originelePower: '190 PK',
    origineleTorque: '400 Nm',
    nieuwePower: '243 PK',
    nieuweTorque: '528 Nm',
    versie: 'v1.2',
    bestandstype: '.zip',
    checksum: 'a1b2c3d4e5f6',
    opmerkingen: 'Uitstekende resultaten behaald. Klant zeer tevreden met de performance.',
    testResultaten: 'Alle tests geslaagd',
    compatibiliteit: 'BMW 320d 2019-2021',
    ontwikkelaar: 'Tuning Team A',
    laatsteWijziging: '2024-01-15 14:30'
  },
  {
    id: 2,
    naam: 'Audi_A4_TDI_2020_Stage2',
    voertuig: 'Audi A4 2.0 TDI',
    klant: 'Piet de Vries',
    klantEmail: 'piet.devries@email.nl',
    type: 'Stage 2',
    bestandsgrootte: '3.1 MB',
    uploadDatum: '2024-01-14',
    status: 'In ontwikkeling',
    powerGain: '+35%',
    torqueGain: '+40%',
    originelePower: '150 PK',
    origineleTorque: '320 Nm',
    nieuwePower: '202 PK',
    nieuweTorque: '448 Nm',
    versie: 'v2.1-beta',
    bestandstype: '.zip',
    checksum: 'b2c3d4e5f6g7',
    opmerkingen: 'Stage 2 tuning in ontwikkeling. Verwacht resultaat: +35% power, +40% torque.',
    testResultaten: 'In testfase',
    compatibiliteit: 'Audi A4 2.0 TDI 2020-2022',
    ontwikkelaar: 'Tuning Team B',
    laatsteWijziging: '2024-01-14 16:45'
  },
  {
    id: 3,
    naam: 'VW_Golf_GTI_2018_ECU',
    voertuig: 'Volkswagen Golf GTI',
    klant: 'Klaas Bakker',
    klantEmail: 'klaas.bakker@email.nl',
    type: 'ECU Tuning',
    bestandsgrootte: '1.8 MB',
    uploadDatum: '2024-01-13',
    status: 'Gereed',
    powerGain: '+35%',
    torqueGain: '+38%',
    originelePower: '220 PK',
    origineleTorque: '350 Nm',
    nieuwePower: '297 PK',
    nieuweTorque: '483 Nm',
    versie: 'v1.0',
    bestandstype: '.zip',
    checksum: 'c3d4e5f6g7h8',
    opmerkingen: 'ECU tuning met downpipe en intercooler. Spectaculaire resultaten!',
    testResultaten: 'Alle tests geslaagd',
    compatibiliteit: 'VW Golf GTI 2018-2020',
    ontwikkelaar: 'Tuning Team A',
    laatsteWijziging: '2024-01-13 11:20'
  },
  {
    id: 4,
    naam: 'Mercedes_C200_2021_Stage1',
    voertuig: 'Mercedes C200',
    klant: 'Marieke Smit',
    klantEmail: 'marieke.smit@email.nl',
    type: 'Stage 1',
    bestandsgrootte: '2.7 MB',
    uploadDatum: '2024-01-12',
    status: 'Gereed',
    powerGain: '+25%',
    torqueGain: '+30%',
    originelePower: '197 PK',
    origineleTorque: '280 Nm',
    nieuwePower: '246 PK',
    nieuweTorque: '364 Nm',
    versie: 'v1.1',
    bestandstype: '.zip',
    checksum: 'd4e5f6g7h8i9',
    opmerkingen: 'Conservatieve tuning voor dagelijks gebruik. Klant zeer tevreden.',
    testResultaten: 'Alle tests geslaagd',
    compatibiliteit: 'Mercedes C200 2021-2023',
    ontwikkelaar: 'Tuning Team C',
    laatsteWijziging: '2024-01-12 09:15'
  },
  {
    id: 5,
    naam: 'Volvo_V60_D4_2020_Stage1',
    voertuig: 'Volvo V60 D4',
    klant: 'Hans Visser',
    klantEmail: 'hans.visser@email.nl',
    type: 'Stage 1',
    bestandsgrootte: '2.2 MB',
    uploadDatum: '2024-01-11',
    status: 'Wachtend',
    powerGain: '+22%',
    torqueGain: '+28%',
    originelePower: '190 PK',
    origineleTorque: '400 Nm',
    nieuwePower: '232 PK',
    nieuweTorque: '512 Nm',
    versie: 'v1.0-draft',
    bestandstype: '.zip',
    checksum: 'e5f6g7h8i9j0',
    opmerkingen: 'Wacht op goedkeuring van klant voor tuning.',
    testResultaten: 'Nog niet getest',
    compatibiliteit: 'Volvo V60 D4 2020-2022',
    ontwikkelaar: 'Tuning Team B',
    laatsteWijziging: '2024-01-11 13:30'
  }
]

const statusColors = {
  'Gereed': 'bg-green-500/20 text-green-400',
  'In ontwikkeling': 'bg-orange-500/20 text-orange-400',
  'Wachtend': 'bg-gray-500/20 text-gray-400',
  'Gearchiveerd': 'bg-blue-500/20 text-blue-400'
}

export default function TuningPage() {
  const [tuningBestanden, setTuningBestanden] = useState(initialTuningBestanden)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [selectedBestand, setSelectedBestand] = useState<typeof tuningBestanden[0] | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [showNewBestandModal, setShowNewBestandModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Filter tuning bestanden based on search and filters
  const filteredTuningBestanden = tuningBestanden.filter(bestand => {
    const matchesSearch = searchTerm === '' || 
      bestand.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bestand.voertuig.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bestand.klant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bestand.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === '' || bestand.status === statusFilter
    const matchesType = typeFilter === '' || bestand.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleBestandClick = (bestand: typeof tuningBestanden[0]) => {
    setSelectedBestand(bestand)
    setShowDetailModal(true)
  }

  const handleEditClick = (bestand: typeof tuningBestanden[0]) => {
    setSelectedBestand(bestand)
    setShowEditModal(true)
  }

  const handleDeleteClick = (bestandId: number) => {
    setShowDeleteConfirm(bestandId)
  }

  const handleDeleteBestand = (bestandId: number) => {
    setTuningBestanden(prevBestanden => prevBestanden.filter(bestand => bestand.id !== bestandId))
    setShowDeleteConfirm(null)
    showNotification(`Tuning bestand succesvol verwijderd`, 'success')
  }

  const handleNewBestand = () => {
    setShowNewBestandModal(true)
  }

  const handleUploadBestand = () => {
    setShowUploadModal(true)
  }

  const handleDownloadBestand = (bestand: typeof tuningBestanden[0]) => {
    // Hier zou je normaal het bestand downloaden
    console.log('Downloading tuning file:', bestand.naam + bestand.bestandstype)
    showNotification(`Tuning bestand ${bestand.naam} wordt gedownload`, 'success')
  }

  const handleEmailKlant = (email: string) => {
    window.open(`mailto:${email}?subject=Tuning Bestand Beschikbaar`, '_blank')
    showNotification(`Email client geopend voor ${email}`, 'success')
  }

  const closeModal = () => {
    setShowDetailModal(false)
    setShowEditModal(false)
    setShowNewBestandModal(false)
    setShowUploadModal(false)
    setSelectedBestand(null)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setStatusFilter('')
    setTypeFilter('')
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
            <h1 className="text-3xl font-bold text-white">Tuning Bestanden</h1>
            <p className="text-secondary-400 mt-2">
              Beheer alle ECU tuning bestanden en configuraties
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleUploadBestand}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span>Upload</span>
            </button>
            <button 
              onClick={handleNewBestand}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nieuw Bestand</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700/50">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Zoek tuning bestanden..."
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
              <option value="Gereed">Gereed</option>
              <option value="In ontwikkeling">In ontwikkeling</option>
              <option value="Wachtend">Wachtend</option>
              <option value="Gearchiveerd">Gearchiveerd</option>
            </select>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Alle Types</option>
              <option value="Stage 1">Stage 1</option>
              <option value="Stage 2">Stage 2</option>
              <option value="ECU Tuning">ECU Tuning</option>
              <option value="Custom">Custom</option>
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
          {filteredTuningBestanden.length} van {tuningBestanden.length} tuning bestanden gevonden
        </div>

        {/* Tuning Bestanden Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTuningBestanden.map((bestand) => (
            <div key={bestand.id} className="bg-dark-800 rounded-lg border border-dark-700/50 p-6 hover:border-primary-500/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 
                      className="text-white font-medium cursor-pointer hover:text-primary-400 transition-colors"
                      onClick={() => handleBestandClick(bestand)}
                    >
                      {bestand.naam}
                    </h3>
                    <p className="text-secondary-400 text-sm">{bestand.voertuig}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => handleEditClick(bestand)}
                    className="text-secondary-400 hover:text-blue-400 transition-colors p-1"
                    title="Bewerken"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(bestand.id)}
                    className="text-secondary-400 hover:text-red-400 transition-colors p-1"
                    title="Verwijderen"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">Klant:</span>
                  <span className="text-white">{bestand.klant}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">Type:</span>
                  <span className="text-primary-400 font-medium">{bestand.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">Grootte:</span>
                  <span className="text-white">{bestand.bestandsgrootte}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">Upload:</span>
                  <span className="text-white">{bestand.uploadDatum}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">Versie:</span>
                  <span className="text-white">{bestand.versie}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[bestand.status as keyof typeof statusColors]}`}>
                  {bestand.status}
                </span>
                <div className="text-right">
                  <div className="text-xs text-green-400">{bestand.powerGain}</div>
                  <div className="text-xs text-blue-400">{bestand.torqueGain}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleBestandClick(bestand)}
                  className="flex-1 bg-dark-700 hover:bg-dark-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Bekijken</span>
                </button>
                <button 
                  onClick={() => handleDownloadBestand(bestand)}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Downloaden</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Totaal Bestanden</p>
                <p className="text-2xl font-bold text-white">{tuningBestanden.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Gereed</p>
                <p className="text-2xl font-bold text-white">{tuningBestanden.filter(b => b.status === 'Gereed').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">In ontwikkeling</p>
                <p className="text-2xl font-bold text-white">{tuningBestanden.filter(b => b.status === 'In ontwikkeling').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Gemiddelde Power Gain</p>
                <p className="text-2xl font-bold text-white">+29%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedBestand && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xl">{selectedBestand.naam}</h3>
                    <p className="text-secondary-400">{selectedBestand.voertuig}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="text-secondary-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bestand Informatie */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Bestand Informatie</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Bestandsnaam:</span>
                        <span className="text-white font-medium">{selectedBestand.naam}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Type:</span>
                        <span className="text-primary-400 font-medium">{selectedBestand.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Grootte:</span>
                        <span className="text-white">{selectedBestand.bestandsgrootte}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Bestandstype:</span>
                        <span className="text-white font-mono">{selectedBestand.bestandstype}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Versie:</span>
                        <span className="text-white">{selectedBestand.versie}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Checksum:</span>
                        <span className="text-white font-mono text-sm">{selectedBestand.checksum}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Klant & Voertuig</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Klant:</span>
                        <span className="text-white font-medium">{selectedBestand.klant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Email:</span>
                        <span className="text-white">{selectedBestand.klantEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Voertuig:</span>
                        <span className="text-white">{selectedBestand.voertuig}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Compatibiliteit:</span>
                        <span className="text-white text-sm">{selectedBestand.compatibiliteit}</span>
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
                          <div className="text-white font-bold text-lg">{selectedBestand.originelePower}</div>
                        </div>
                        <div className="text-center p-3 bg-dark-600 rounded-lg">
                          <div className="text-secondary-400 text-sm">Nieuwe Power</div>
                          <div className="text-green-400 font-bold text-lg">{selectedBestand.nieuwePower}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-dark-600 rounded-lg">
                          <div className="text-secondary-400 text-sm">Originele Torque</div>
                          <div className="text-white font-bold text-lg">{selectedBestand.origineleTorque}</div>
                        </div>
                        <div className="text-center p-3 bg-dark-600 rounded-lg">
                          <div className="text-secondary-400 text-sm">Nieuwe Torque</div>
                          <div className="text-blue-400 font-bold text-lg">{selectedBestand.nieuweTorque}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dark-600">
                        <div className="text-center">
                          <div className="text-secondary-400 text-sm">Power Gain</div>
                          <div className="text-green-400 font-bold text-lg">{selectedBestand.powerGain}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-secondary-400 text-sm">Torque Gain</div>
                          <div className="text-blue-400 font-bold text-lg">{selectedBestand.torqueGain}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Technische Details</h4>
                    <div className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Status:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedBestand.status as keyof typeof statusColors]}`}>
                          {selectedBestand.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Ontwikkelaar:</span>
                        <span className="text-white">{selectedBestand.ontwikkelaar}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Upload datum:</span>
                        <span className="text-white">{selectedBestand.uploadDatum}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Laatste wijziging:</span>
                        <span className="text-white">{selectedBestand.laatsteWijziging}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Test resultaten:</span>
                        <span className="text-white">{selectedBestand.testResultaten}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opmerkingen */}
              <div className="mt-6">
                <h4 className="text-white font-semibold text-lg mb-4">Opmerkingen</h4>
                <div className="bg-dark-700 rounded-lg p-4">
                  <p className="text-white leading-relaxed">{selectedBestand.opmerkingen}</p>
                </div>
              </div>

              {/* Actie Knoppen */}
              <div className="flex items-center space-x-4 pt-6 border-t border-dark-600">
                <button
                  onClick={() => handleDownloadBestand(selectedBestand)}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Downloaden</span>
                </button>
                <button
                  onClick={() => handleEmailKlant(selectedBestand.klantEmail)}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <FileCode className="h-4 w-4" />
                  <span>Email naar Klant</span>
                </button>
                <button
                  onClick={() => handleEditClick(selectedBestand)}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Bewerken</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(selectedBestand.id)}
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
              <h3 className="text-white font-semibold text-lg mb-4">Tuning Bestand Verwijderen</h3>
              <p className="text-secondary-400 mb-6">
                Weet je zeker dat je dit tuning bestand wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDeleteBestand(showDeleteConfirm)}
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
