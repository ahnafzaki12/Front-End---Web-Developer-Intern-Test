import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
      <span className="font-bold">Aksamedia Test</span>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2"
        >
          <span>{user?.fullName}</span>
          <span className="text-sm">▼</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
