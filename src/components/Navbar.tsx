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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="w-full bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-3 flex justify-between items-center transition-colors">
      <div className="flex items-center gap-8">
        <span className="font-bold text-blue-600 dark:text-blue-400">Aksamedia Test</span>

        <div className="flex gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>
          <Link to="/crud" className="hover:text-blue-600 dark:hover:text-blue-400">CRUD Data</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          {['light', 'dark', 'system'].map((t) => (
            <button
              key={t}
              onClick={() => changeTheme(t as any)}
              className={`px-3 py-1 text-xs capitalize rounded-md transition ${theme === t
                ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* DROPDOWN USER */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2 outline-none">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-bold">
              {user?.fullName?.charAt(0)}
            </div>
            <span className="text-sm font-medium dark:text-gray-200">{user?.fullName}</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl py-1 z-50">
              <div className="px-4 py-2 border-b dark:border-gray-700 text-xs text-gray-500 dark:text-white">
                {user?.username}
              </div>
              <button
                onClick={() => {
                  navigate('/profile')
                  setOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}