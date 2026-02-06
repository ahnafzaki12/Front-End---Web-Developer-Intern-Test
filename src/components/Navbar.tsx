import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useThemeContext } from '../context/ThemeContext'

export default function Navbar() {
  const { user, logout } = useAuthContext()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { theme, changeTheme } = useThemeContext()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activeClass = (path: string) =>
    location.pathname === path
      ? "text-blue-600 dark:text-blue-400 font-semibold"
      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"

  return (
    <nav className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="flex items-center gap-10">
          <Link to="/">
            <span className="font-bold text-lg text-gray-700 dark:text-white">
              Aksamedia Test
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className={`transition-colors cursor-pointer ${activeClass('/')}`}>Home</Link>
            <Link to="/crud" className={`transition-colors cursor-pointer ${activeClass('/crud')}`}>CRUD Data</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex bg-gray-100 dark:bg-gray-800 p-1 rounded-full border border-gray-200 dark:border-gray-700">
            {['light', 'dark', 'system'].map((t) => (
              <button
                key={t}
                onClick={() => changeTheme(t as any)}
                className={`px-4 py-1.5 text-xs uppercase font-bold rounded-full transition-all cursor-pointer ${theme === t
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="group flex items-center gap-3 p-1.5 pr-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all outline-none cursor-pointer"
            >
              <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.fullName}</p>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl py-2 z-50">
                <div className="p-1">
                  <button
                    onClick={() => { navigate('/profile'); setOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors cursor-pointer"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-1 cursor-pointer font-medium"
                  >
                    Logout Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}