import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom' // Tambah Link di sini
import { useAuthContext } from '../hooks/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuthContext()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
    <nav className="w-full bg-white border-b px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <span className="font-bold text-blue-600">Aksamedia Test</span>
        
        {/* LINK NAVIGASI BARU */}
        <div className="flex gap-4 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/crud" className="hover:text-blue-600">Manage Data</Link>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 outline-none"
        >
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">
            {user?.fullName?.charAt(0)}
          </div>
          <span className="text-sm font-medium">{user?.fullName}</span>
          <span className="text-[10px] text-gray-400">▼</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl py-1 z-50">
            <div className="px-4 py-2 border-b text-xs text-gray-500">
              {user?.username}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}