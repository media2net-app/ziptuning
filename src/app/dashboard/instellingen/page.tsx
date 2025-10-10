'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Settings, User, Shield, Bell, Palette, Database, Globe, Save, Eye, EyeOff, CheckCircle, AlertCircle, X, Trash2, Upload, Download, Key, Lock, Unlock } from 'lucide-react'

export default function InstellingenPage() {
  const [profileData, setProfileData] = useState({
    bedrijfsnaam: 'Ziptuning Noord',
    email: 'info@ziptuningnoord.nl',
    telefoon: '+31 6 12345678',
    adres: 'Werkplaats Noord\n123 Tuningstraat\n1234 AB Noord',
    website: 'www.ziptuningnoord.nl',
    kvkNummer: '12345678',
    btwNummer: 'NL123456789B01'
  })

  const [securityData, setSecurityData] = useState({
    huidigWachtwoord: '',
    nieuwWachtwoord: '',
    bevestigWachtwoord: '',
    tweeFactor: false,
    sessieTimeout: 30,
    maxLoginPogingen: 5
  })

  const [notifications, setNotifications] = useState({
    emailNotificaties: true,
    nieuweAfspraken: true,
    tuningVoltooid: true,
    systeemUpdates: false,
    klantReviews: true,
    backupNotificaties: true,
    securityAlerts: true
  })

  const [systemSettings, setSystemSettings] = useState({
    tijdzone: 'Europe/Amsterdam',
    datumFormaat: 'DD/MM/YYYY',
    valuta: 'EUR',
    taal: 'nl',
    automatischeBackups: true,
    backupFrequentie: 'dagelijks',
    dataRetentie: 90,
    darkMode: true
  })

  const [showPassword, setShowPassword] = useState({
    huidig: false,
    nieuw: false,
    bevestig: false
  })

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleSecurityChange = (field: string, value: string | boolean | number) => {
    setSecurityData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }))
  }

  const handleSystemChange = (field: string, value: string | boolean | number) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }))
  }

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      showNotification('Instellingen succesvol opgeslagen', 'success')
    }, 1500)
  }

  const handlePasswordChange = async () => {
    if (securityData.nieuwWachtwoord !== securityData.bevestigWachtwoord) {
      showNotification('Wachtwoorden komen niet overeen', 'error')
      return
    }
    
    if (securityData.nieuwWachtwoord.length < 8) {
      showNotification('Wachtwoord moet minimaal 8 karakters bevatten', 'error')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSecurityData(prev => ({
        ...prev,
        huidigWachtwoord: '',
        nieuwWachtwoord: '',
        bevestigWachtwoord: ''
      }))
      showNotification('Wachtwoord succesvol gewijzigd', 'success')
    }, 1500)
  }

  const tabs = [
    { id: 'profile', label: 'Profiel', icon: User },
    { id: 'security', label: 'Beveiliging', icon: Shield },
    { id: 'notifications', label: 'Notificaties', icon: Bell },
    { id: 'system', label: 'Systeem', icon: Settings }
  ]

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
            <h1 className="text-3xl font-bold text-white">Instellingen</h1>
            <p className="text-secondary-400 mt-2">
              Configureer het chiptuning beheer systeem
            </p>
          </div>
          <button 
            onClick={handleSaveSettings}
            disabled={isLoading}
            className="bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Save className="h-5 w-5" />
            )}
            <span>{isLoading ? 'Opslaan...' : 'Instellingen Opslaan'}</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-dark-800 rounded-lg p-1 border border-dark-700/50">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'text-secondary-400 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Profiel Instellingen */}
          {activeTab === 'profile' && (
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-6 w-6 text-primary-500" />
                <h2 className="text-xl font-semibold text-white">Profiel Instellingen</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Bedrijfsnaam *
                    </label>
                    <input
                      type="text"
                      value={profileData.bedrijfsnaam}
                      onChange={(e) => handleProfileChange('bedrijfsnaam', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Adres *
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Telefoonnummer
                    </label>
                    <input
                      type="tel"
                      value={profileData.telefoon}
                      onChange={(e) => handleProfileChange('telefoon', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleProfileChange('website', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      KVK Nummer
                    </label>
                    <input
                      type="text"
                      value={profileData.kvkNummer}
                      onChange={(e) => handleProfileChange('kvkNummer', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      BTW Nummer
                    </label>
                    <input
                      type="text"
                      value={profileData.btwNummer}
                      onChange={(e) => handleProfileChange('btwNummer', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Adres
                </label>
                <textarea
                  value={profileData.adres}
                  onChange={(e) => handleProfileChange('adres', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          )}

          {/* Beveiliging */}
          {activeTab === 'security' && (
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-6 w-6 text-primary-500" />
                <h2 className="text-xl font-semibold text-white">Beveiliging</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Huidig Wachtwoord
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.huidig ? 'text' : 'password'}
                        value={securityData.huidigWachtwoord}
                        onChange={(e) => handleSecurityChange('huidigWachtwoord', e.target.value)}
                        placeholder="Voer huidig wachtwoord in"
                        className="w-full px-3 py-2 pr-10 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('huidig')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-white"
                      >
                        {showPassword.huidig ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Nieuw Wachtwoord
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.nieuw ? 'text' : 'password'}
                        value={securityData.nieuwWachtwoord}
                        onChange={(e) => handleSecurityChange('nieuwWachtwoord', e.target.value)}
                        placeholder="Voer nieuw wachtwoord in"
                        className="w-full px-3 py-2 pr-10 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('nieuw')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-white"
                      >
                        {showPassword.nieuw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Bevestig Nieuw Wachtwoord
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.bevestig ? 'text' : 'password'}
                        value={securityData.bevestigWachtwoord}
                        onChange={(e) => handleSecurityChange('bevestigWachtwoord', e.target.value)}
                        placeholder="Bevestig nieuw wachtwoord"
                        className="w-full px-3 py-2 pr-10 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('bevestig')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-white"
                      >
                        {showPassword.bevestig ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePasswordChange}
                    disabled={isLoading || !securityData.huidigWachtwoord || !securityData.nieuwWachtwoord || !securityData.bevestigWachtwoord}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Key className="h-4 w-4" />
                    <span>Wachtwoord Wijzigen</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Twee-factor authenticatie</p>
                      <p className="text-secondary-400 text-sm">Extra beveiliging voor je account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={securityData.tweeFactor}
                        onChange={(e) => handleSecurityChange('tweeFactor', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Sessie Timeout (minuten)
                    </label>
                    <select 
                      value={securityData.sessieTimeout}
                      onChange={(e) => handleSecurityChange('sessieTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value={15}>15 minuten</option>
                      <option value={30}>30 minuten</option>
                      <option value={60}>1 uur</option>
                      <option value={120}>2 uur</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Maximum Login Pogingen
                    </label>
                    <select 
                      value={securityData.maxLoginPogingen}
                      onChange={(e) => handleSecurityChange('maxLoginPogingen', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value={3}>3 pogingen</option>
                      <option value={5}>5 pogingen</option>
                      <option value={10}>10 pogingen</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notificaties */}
          {activeTab === 'notifications' && (
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="h-6 w-6 text-primary-500" />
                <h2 className="text-xl font-semibold text-white">Notificaties</h2>
              </div>
              
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => {
                  const labels = {
                    emailNotificaties: { title: 'Email Notificaties', description: 'Ontvang updates via email' },
                    nieuweAfspraken: { title: 'Nieuwe Afspraken', description: 'Meldingen voor nieuwe afspraken' },
                    tuningVoltooid: { title: 'Tuning Voltooid', description: 'Meldingen wanneer tuning klaar is' },
                    systeemUpdates: { title: 'Systeem Updates', description: 'Belangrijke systeem updates' },
                    klantReviews: { title: 'Klant Reviews', description: 'Nieuwe klant beoordelingen' },
                    backupNotificaties: { title: 'Backup Notificaties', description: 'Meldingen over backup status' },
                    securityAlerts: { title: 'Security Alerts', description: 'Beveiligingswaarschuwingen' }
                  }
                  
                  return (
                    <div key={key} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{labels[key as keyof typeof labels].title}</p>
                        <p className="text-secondary-400 text-sm">{labels[key as keyof typeof labels].description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={value}
                          onChange={(e) => handleNotificationChange(key, e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Systeem Instellingen */}
          {activeTab === 'system' && (
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700/50">
              <div className="flex items-center space-x-3 mb-6">
                <Settings className="h-6 w-6 text-primary-500" />
                <h2 className="text-xl font-semibold text-white">Systeem Instellingen</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Tijdzone
                    </label>
                    <select 
                      value={systemSettings.tijdzone}
                      onChange={(e) => handleSystemChange('tijdzone', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Europe/Amsterdam">Europe/Amsterdam (CET)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Datum Formaat
                    </label>
                    <select 
                      value={systemSettings.datumFormaat}
                      onChange={(e) => handleSystemChange('datumFormaat', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Valuta
                    </label>
                    <select 
                      value={systemSettings.valuta}
                      onChange={(e) => handleSystemChange('valuta', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="EUR">Euro (€)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Taal
                    </label>
                    <select 
                      value={systemSettings.taal}
                      onChange={(e) => handleSystemChange('taal', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="nl">Nederlands</option>
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Automatische Backups</p>
                      <p className="text-secondary-400 text-sm">Dagelijkse backup van data</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={systemSettings.automatischeBackups}
                        onChange={(e) => handleSystemChange('automatischeBackups', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Backup Frequentie
                    </label>
                    <select 
                      value={systemSettings.backupFrequentie}
                      onChange={(e) => handleSystemChange('backupFrequentie', e.target.value)}
                      disabled={!systemSettings.automatischeBackups}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      <option value="dagelijks">Dagelijks</option>
                      <option value="wekelijks">Wekelijks</option>
                      <option value="maandelijks">Maandelijks</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Data Retentie (dagen)
                    </label>
                    <select 
                      value={systemSettings.dataRetentie}
                      onChange={(e) => handleSystemChange('dataRetentie', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value={30}>30 dagen</option>
                      <option value={90}>90 dagen</option>
                      <option value={365}>1 jaar</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Dark Mode</p>
                      <p className="text-secondary-400 text-sm">Donkere interface</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={systemSettings.darkMode}
                        onChange={(e) => handleSystemChange('darkMode', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
