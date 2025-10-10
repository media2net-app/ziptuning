'use client'

import { useState } from 'react'
import { Eye, EyeOff, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: 'admin@ziptuningnoord.nl',
    password: 'demo123'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simuleer login proces
    setTimeout(() => {
      setIsLoading(false)
      // Navigeer naar dashboard na succesvol inloggen
      router.push('/dashboard')
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo en titel */}
        <div className="text-center">
          <div className="mx-auto h-16 w-auto flex items-center justify-center mb-4">
            <Image
              src="/logo.svg"
              alt="Ziptuning Noord Logo"
              width={64}
              height={64}
              className="w-auto h-full object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Ziptuning Noord
          </h2>
          <p className="text-secondary-400">
            Beheer Dashboard
          </p>
        </div>

        {/* Login formulier */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Gebruikersnaam
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-secondary-600 rounded-lg bg-white/10 text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Voer uw gebruikersnaam in"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Wachtwoord
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-secondary-600 rounded-lg bg-white/10 text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Voer uw wachtwoord in"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-secondary-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-secondary-400 hover:text-white transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-secondary-600 rounded bg-white/10"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-300">
                  Onthoud mij
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                  Wachtwoord vergeten?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Inloggen...' : 'Inloggen'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-secondary-400 text-sm">
            © 2024 Ziptuning Noord. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </div>
  )
}
