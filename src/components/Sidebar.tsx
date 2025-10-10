'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Car, 
  Settings, 
  Users, 
  FileText, 
  BarChart3, 
  Calendar,
  LogOut,
  Menu,
  X,
  Inbox
} from 'lucide-react'
import Image from 'next/image'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Aanvragen',
    href: '/dashboard/leads',
    icon: Inbox,
    notification: 23
  },
  {
    title: 'Voertuigen',
    href: '/dashboard/voertuigen',
    icon: Car
  },
  {
    title: 'Klanten',
    href: '/dashboard/klanten',
    icon: Users
  },
  {
    title: 'Tuning Bestanden',
    href: '/dashboard/tuning',
    icon: FileText
  },
  {
    title: 'Afspraken',
    href: '/dashboard/afspraken',
    icon: Calendar
  },
  {
    title: 'Rapporten',
    href: '/dashboard/rapporten',
    icon: BarChart3
  },
  {
    title: 'Instellingen',
    href: '/dashboard/instellingen',
    icon: Settings
  }
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-dark-900 border-r border-dark-700 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-dark-700">
        <Link href="/" className={`flex items-center space-x-3 ${isCollapsed ? 'hidden' : ''}`}>
          <Image src="/logo.svg" alt="Ziptuning Noord" width={32} height={32} className="h-8 w-auto" />
          <span className="text-xl font-bold text-white">Noord</span>
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-secondary-400 hover:text-white transition-colors"
        >
          {isCollapsed ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-500 text-white' 
                  : 'text-secondary-300 hover:bg-dark-700 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.title}</span>}
              </div>
              {!isCollapsed && item.notification && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                  {item.notification}
                </span>
              )}
              {isCollapsed && item.notification && (
                <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-1 rounded-full min-w-[16px] text-center absolute -top-1 -right-1">
                  {item.notification > 99 ? '99+' : item.notification}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-dark-700">
        <button className="flex items-center space-x-3 text-secondary-300 hover:text-white transition-colors w-full">
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Uitloggen</span>}
        </button>
      </div>
    </aside>
  )
}
