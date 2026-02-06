import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuthContext } from '../context/AuthContext'

export default function Profile() {
  const { user, updateProfile } = useAuthContext()
  const [fullName, setFullName] = useState(user?.fullName || '')
  const [saved, setSaved] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateProfile(fullName)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nama Lengkap</label>
            <input
              className="w-full border p-2"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
          </div>

          <button className="bg-blue-600 text-white px-4 py-2">
            Simpan
          </button>

          {saved && (
            <p className="text-green-600">Profile berhasil diperbarui</p>
          )}
        </form>
      </div>
    </>
  )
}
