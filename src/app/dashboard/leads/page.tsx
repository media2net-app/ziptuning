'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Inbox, Plus, Search, Filter, MoreVertical, Mail, Phone, Car, Clock, CheckCircle, XCircle, AlertCircle, Eye, MessageSquare, Trash2, Edit, X, Calendar, Send } from 'lucide-react'

const initialLeads = [
  {
    id: 1,
    naam: 'Mark de Vries',
    email: 'mark.devries@email.nl',
    telefoon: '+31 6 11111111',
    voertuig: 'BMW 520d (2020)',
    type: 'Stage 1 Tuning',
    bericht: 'Hallo, ik ben geïnteresseerd in een stage 1 tuning voor mijn BMW 520d. Wat zijn de mogelijkheden en kosten?',
    datum: '2024-01-20 14:30',
    status: 'Nieuw',
    prioriteit: 'Hoog',
    bron: 'Website Contact'
  },
  {
    id: 2,
    naam: 'Lisa Bakker',
    email: 'lisa.bakker@email.nl',
    telefoon: '+31 6 22222222',
    voertuig: 'Audi A3 2.0 TDI',
    type: 'ECU Tuning',
    bericht: 'Ik heb een Audi A3 uit 2019 en wil graag meer power. Kunnen jullie helpen?',
    datum: '2024-01-20 13:15',
    status: 'In behandeling',
    prioriteit: 'Normaal',
    bron: 'Website Contact'
  },
  {
    id: 3,
    naam: 'Tom Jansen',
    email: 'tom.jansen@email.nl',
    telefoon: '+31 6 33333333',
    voertuig: 'Volkswagen Golf R',
    type: 'Stage 2 Tuning',
    bericht: 'Ik zoek een professionele tuning voor mijn Golf R. Wat kunnen jullie voor mij betekenen?',
    datum: '2024-01-20 11:45',
    status: 'Beantwoord',
    prioriteit: 'Hoog',
    bron: 'Website Contact'
  },
  {
    id: 4,
    naam: 'Sarah Smit',
    email: 'sarah.smit@email.nl',
    telefoon: '+31 6 44444444',
    voertuig: 'Mercedes C220d',
    type: 'Stage 1 Tuning',
    bericht: 'Hallo, ik wil graag meer informatie over jullie tuning diensten voor Mercedes.',
    datum: '2024-01-19 16:20',
    status: 'Nieuw',
    prioriteit: 'Normaal',
    bron: 'Website Contact'
  },
  {
    id: 5,
    naam: 'Kevin Visser',
    email: 'kevin.visser@email.nl',
    telefoon: '+31 6 55555555',
    voertuig: 'Volvo S60 D4',
    type: 'ECU Tuning',
    bericht: 'Ik heb een Volvo S60 en ben benieuwd naar de mogelijkheden voor tuning.',
    datum: '2024-01-19 14:10',
    status: 'Afgehandeld',
    prioriteit: 'Laag',
    bron: 'Website Contact'
  }
]

const statusColors = {
  'Nieuw': 'bg-blue-500/20 text-blue-400',
  'In behandeling': 'bg-orange-500/20 text-orange-400',
  'Beantwoord': 'bg-green-500/20 text-green-400',
  'Afgehandeld': 'bg-gray-500/20 text-gray-400'
}

const prioriteitColors = {
  'Hoog': 'bg-red-500/20 text-red-400',
  'Normaal': 'bg-yellow-500/20 text-yellow-400',
  'Laag': 'bg-green-500/20 text-green-400'
}

export default function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [prioriteitFilter, setPrioriteitFilter] = useState('')
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showNewLeadModal, setShowNewLeadModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  
  // Reply form state
  const [replyForm, setReplyForm] = useState({
    onderwerp: '',
    bericht: '',
    kopieNaarKlant: true,
    interneNotitie: ''
  })
  
  // Schedule form state
  const [scheduleForm, setScheduleForm] = useState({
    datum: '',
    tijd: '',
    type: 'Tuning Afspraak',
    locatie: 'Werkplaats',
    opmerkingen: ''
  })

  // Filter leads based on search and filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchTerm === '' || 
      lead.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.voertuig.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === '' || lead.status === statusFilter
    const matchesPrioriteit = prioriteitFilter === '' || lead.prioriteit === prioriteitFilter
    
    return matchesSearch && matchesStatus && matchesPrioriteit
  })

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleLeadClick = (lead: typeof leads[0]) => {
    setSelectedLead(lead)
    setShowDetailModal(true)
  }

  const handleStatusChange = (leadId: number, newStatus: string) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    )
    showNotification(`Status van aanvraag ${leadId} gewijzigd naar ${newStatus}`, 'success')
  }

  const handlePrioriteitChange = (leadId: number, newPrioriteit: string) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId ? { ...lead, prioriteit: newPrioriteit } : lead
      )
    )
    showNotification(`Prioriteit van aanvraag ${leadId} gewijzigd naar ${newPrioriteit}`, 'success')
  }

  const handleDeleteLead = (leadId: number) => {
    setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId))
    setShowDeleteConfirm(null)
    showNotification(`Aanvraag ${leadId} succesvol verwijderd`, 'success')
  }

  const handleNewLead = () => {
    setShowNewLeadModal(true)
  }

  const handleEmailClick = (email: string) => {
    window.open(`mailto:${email}?subject=Reactie op uw tuning aanvraag`, '_blank')
    showNotification(`Email client geopend voor ${email}`, 'success')
  }

  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`, '_blank')
    showNotification(`Telefoon app geopend voor ${phone}`, 'success')
  }

  const handleReplyClick = (lead: typeof leads[0]) => {
    setSelectedLead(lead)
    setReplyForm({
      onderwerp: `Reactie op uw ${lead.type} aanvraag`,
      bericht: `Beste ${lead.naam},\n\nBedankt voor uw interesse in onze tuning diensten voor uw ${lead.voertuig}.\n\n`,
      kopieNaarKlant: true,
      interneNotitie: ''
    })
    setShowReplyModal(true)
  }

  const handleScheduleClick = (lead: typeof leads[0]) => {
    setSelectedLead(lead)
    setScheduleForm({
      datum: '',
      tijd: '',
      type: 'Tuning Afspraak',
      locatie: 'Werkplaats',
      opmerkingen: `Aanvraag van ${lead.naam} - ${lead.voertuig}`
    })
    setShowScheduleModal(true)
  }

  const handleSendReply = () => {
    if (!selectedLead) return
    
    // Hier zou je normaal de email versturen via je backend
    console.log('Email verstuurd:', {
      naar: selectedLead.email,
      onderwerp: replyForm.onderwerp,
      bericht: replyForm.bericht,
      kopieNaarKlant: replyForm.kopieNaarKlant,
      interneNotitie: replyForm.interneNotitie
    })
    
    // Update status naar "Beantwoord"
    handleStatusChange(selectedLead.id, 'Beantwoord')
    
    setShowReplyModal(false)
    setReplyForm({
      onderwerp: '',
      bericht: '',
      kopieNaarKlant: true,
      interneNotitie: ''
    })
    
    showNotification(`Antwoord succesvol verstuurd naar ${selectedLead.naam}`, 'success')
  }

  const handleScheduleAppointment = () => {
    if (!selectedLead) return
    
    // Hier zou je normaal de afspraak opslaan in je database
    console.log('Afspraak ingepland:', {
      klant: selectedLead.naam,
      voertuig: selectedLead.voertuig,
      datum: scheduleForm.datum,
      tijd: scheduleForm.tijd,
      type: scheduleForm.type,
      locatie: scheduleForm.locatie,
      opmerkingen: scheduleForm.opmerkingen
    })
    
    // Update status naar "In behandeling"
    handleStatusChange(selectedLead.id, 'In behandeling')
    
    setShowScheduleModal(false)
    setScheduleForm({
      datum: '',
      tijd: '',
      type: 'Tuning Afspraak',
      locatie: 'Werkplaats',
      opmerkingen: ''
    })
    
    showNotification(`Afspraak succesvol ingepland voor ${selectedLead.naam}`, 'success')
  }

  const closeModal = () => {
    setShowDetailModal(false)
    setShowNewLeadModal(false)
    setShowReplyModal(false)
    setShowScheduleModal(false)
    setSelectedLead(null)
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
            <h1 className="text-3xl font-bold text-white">Aanvragen</h1>
            <p className="text-secondary-400 mt-2">
              Beheer binnenkomende aanvragen van de website
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
              {leads.filter(lead => lead.status === 'Nieuw').length} Nieuwe
            </div>
            <button 
              onClick={handleNewLead}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nieuwe Aanvraag</span>
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
                placeholder="Zoek in aanvragen..."
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
              <option value="Nieuw">Nieuw</option>
              <option value="In behandeling">In behandeling</option>
              <option value="Beantwoord">Beantwoord</option>
              <option value="Afgehandeld">Afgehandeld</option>
            </select>
            <select 
              value={prioriteitFilter}
              onChange={(e) => setPrioriteitFilter(e.target.value)}
              className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Alle Prioriteiten</option>
              <option value="Hoog">Hoog</option>
              <option value="Normaal">Normaal</option>
              <option value="Laag">Laag</option>
            </select>
            <button 
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('')
                setPrioriteitFilter('')
                showNotification('Alle filters gereset', 'success')
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-secondary-300 hover:text-white transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-secondary-400 text-sm">
          {filteredLeads.length} van {leads.length} aanvragen gevonden
        </div>

        {/* Leads Overzicht */}
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="bg-dark-800 rounded-lg border border-dark-700/50 p-6 hover:border-primary-500/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-12 w-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <Inbox className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-white font-medium text-lg cursor-pointer hover:text-primary-400 transition-colors" onClick={() => handleLeadClick(lead)}>
                          {lead.naam}
                        </h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[lead.status as keyof typeof statusColors]}`}>
                          {lead.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${prioriteitColors[lead.prioriteit as keyof typeof prioriteitColors]}`}>
                          {lead.prioriteit}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-secondary-400">
                        <div className="flex items-center space-x-1 cursor-pointer hover:text-white transition-colors" onClick={() => handleEmailClick(lead.email)}>
                          <Mail className="h-4 w-4" />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 cursor-pointer hover:text-white transition-colors" onClick={() => handlePhoneClick(lead.telefoon)}>
                          <Phone className="h-4 w-4" />
                          <span>{lead.telefoon}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Car className="h-4 w-4" />
                          <span>{lead.voertuig}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{lead.datum}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-primary-400 font-medium">{lead.type}</span>
                      <span className="text-secondary-400">•</span>
                      <span className="text-secondary-400 text-sm">{lead.bron}</span>
                    </div>
                    <p className="text-white text-sm leading-relaxed">
                      {lead.bericht}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleLeadClick(lead)}
                      className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Bekijken</span>
                    </button>
                    <button 
                      onClick={() => handleReplyClick(lead)}
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Beantwoorden</span>
                    </button>
                    <button 
                      onClick={() => handleScheduleClick(lead)}
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Inplannen</span>
                    </button>
                    <select 
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className="bg-dark-700 border border-dark-600 rounded-lg text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Nieuw">Nieuw</option>
                      <option value="In behandeling">In behandeling</option>
                      <option value="Beantwoord">Beantwoord</option>
                      <option value="Afgehandeld">Afgehandeld</option>
                    </select>
                    <select 
                      value={lead.prioriteit}
                      onChange={(e) => handlePrioriteitChange(lead.id, e.target.value)}
                      className="bg-dark-700 border border-dark-600 rounded-lg text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Hoog">Hoog</option>
                      <option value="Normaal">Normaal</option>
                      <option value="Laag">Laag</option>
                    </select>
                    <button 
                      onClick={() => setShowDeleteConfirm(lead.id)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="ml-4">
                  <button className="text-secondary-400 hover:text-white transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 max-w-md w-full mx-4">
              <h3 className="text-white font-semibold text-lg mb-4">Aanvraag Verwijderen</h3>
              <p className="text-secondary-400 mb-6">
                Weet je zeker dat je deze aanvraag wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDeleteLead(showDeleteConfirm)}
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

        {/* Reply Modal */}
        {showReplyModal && selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">Antwoord Sturen</h3>
                <button onClick={closeModal} className="text-secondary-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-secondary-400 text-sm">Naar</label>
                    <p className="text-white font-medium">{selectedLead.naam} ({selectedLead.email})</p>
                  </div>
                  <div>
                    <label className="text-secondary-400 text-sm">Voertuig</label>
                    <p className="text-white">{selectedLead.voertuig}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-secondary-400 text-sm">Onderwerp</label>
                  <input
                    type="text"
                    value={replyForm.onderwerp}
                    onChange={(e) => setReplyForm({...replyForm, onderwerp: e.target.value})}
                    className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="text-secondary-400 text-sm">Bericht</label>
                  <textarea
                    value={replyForm.bericht}
                    onChange={(e) => setReplyForm({...replyForm, bericht: e.target.value})}
                    rows={8}
                    className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={replyForm.kopieNaarKlant}
                      onChange={(e) => setReplyForm({...replyForm, kopieNaarKlant: e.target.checked})}
                      className="rounded border-dark-600 bg-dark-700 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-secondary-400 text-sm">Kopie naar klant</span>
                  </label>
                </div>
                
                <div>
                  <label className="text-secondary-400 text-sm">Interne Notitie (optioneel)</label>
                  <textarea
                    value={replyForm.interneNotitie}
                    onChange={(e) => setReplyForm({...replyForm, interneNotitie: e.target.value})}
                    rows={3}
                    placeholder="Interne notitie die alleen zichtbaar is voor het team..."
                    className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>
                
                <div className="flex items-center space-x-4 pt-4 border-t border-dark-600">
                  <button
                    onClick={handleSendReply}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>Versturen</span>
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Annuleren
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Modal */}
        {showScheduleModal && selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">Afspraak Inplannen</h3>
                <button onClick={closeModal} className="text-secondary-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-secondary-400 text-sm">Klant</label>
                  <p className="text-white font-medium">{selectedLead.naam}</p>
                </div>
                
                <div>
                  <label className="text-secondary-400 text-sm">Voertuig</label>
                  <p className="text-white">{selectedLead.voertuig}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-secondary-400 text-sm">Datum</label>
                    <input
                      type="date"
                      value={scheduleForm.datum}
                      onChange={(e) => setScheduleForm({...scheduleForm, datum: e.target.value})}
                      className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="text-secondary-400 text-sm">Tijd</label>
                    <input
                      type="time"
                      value={scheduleForm.tijd}
                      onChange={(e) => setScheduleForm({...scheduleForm, tijd: e.target.value})}
                      className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-secondary-400 text-sm">Type Afspraak</label>
                  <select
                    value={scheduleForm.type}
                    onChange={(e) => setScheduleForm({...scheduleForm, type: e.target.value})}
                    className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Tuning Afspraak">Tuning Afspraak</option>
                    <option value="Diagnose">Diagnose</option>
                    <option value="Consultatie">Consultatie</option>
                    <option value="Onderhoud">Onderhoud</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-secondary-400 text-sm">Locatie</label>
                  <select
                    value={scheduleForm.locatie}
                    onChange={(e) => setScheduleForm({...scheduleForm, locatie: e.target.value})}
                    className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Werkplaats">Werkplaats</option>
                    <option value="Klant Locatie">Klant Locatie</option>
                    <option value="Telefonisch">Telefonisch</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-secondary-400 text-sm">Opmerkingen</label>
                  <textarea
                    value={scheduleForm.opmerkingen}
                    onChange={(e) => setScheduleForm({...scheduleForm, opmerkingen: e.target.value})}
                    rows={3}
                    className="w-full mt-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>
                
                <div className="flex items-center space-x-4 pt-4 border-t border-dark-600">
                  <button
                    onClick={handleScheduleAppointment}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Inplannen</span>
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Annuleren
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">Aanvraag Details</h3>
                <button onClick={closeModal} className="text-secondary-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-secondary-400 text-sm">Naam</label>
                    <p className="text-white font-medium">{selectedLead.naam}</p>
                  </div>
                  <div>
                    <label className="text-secondary-400 text-sm">Email</label>
                    <p className="text-white">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-secondary-400 text-sm">Telefoon</label>
                    <p className="text-white">{selectedLead.telefoon}</p>
                  </div>
                  <div>
                    <label className="text-secondary-400 text-sm">Voertuig</label>
                    <p className="text-white">{selectedLead.voertuig}</p>
                  </div>
                  <div>
                    <label className="text-secondary-400 text-sm">Type</label>
                    <p className="text-primary-400 font-medium">{selectedLead.type}</p>
                  </div>
                  <div>
                    <label className="text-secondary-400 text-sm">Datum</label>
                    <p className="text-white">{selectedLead.datum}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-secondary-400 text-sm">Bericht</label>
                  <p className="text-white mt-1 bg-dark-700 p-3 rounded-lg">{selectedLead.bericht}</p>
                </div>
                
                <div className="flex items-center space-x-4 pt-4 border-t border-dark-600">
                  <button
                    onClick={() => handleReplyClick(selectedLead)}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Beantwoorden</span>
                  </button>
                  <button
                    onClick={() => handleScheduleClick(selectedLead)}
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Inplannen</span>
                  </button>
                  <button
                    onClick={() => handlePhoneClick(selectedLead.telefoon)}
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Bellen</span>
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
          </div>
        )}

        {/* Statistieken */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Inbox className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Totaal Aanvragen</p>
                <p className="text-2xl font-bold text-white">{leads.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Afgehandeld</p>
                <p className="text-2xl font-bold text-white">{leads.filter(lead => lead.status === 'Afgehandeld').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">In behandeling</p>
                <p className="text-2xl font-bold text-white">{leads.filter(lead => lead.status === 'In behandeling').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-secondary-400 text-sm">Gemiddelde responstijd</p>
                <p className="text-2xl font-bold text-white">2.3u</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
