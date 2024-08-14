import React, { useState } from 'react'
import { Menu, Moon, Sun } from 'lucide-react'

export const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">Notty</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-3 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
