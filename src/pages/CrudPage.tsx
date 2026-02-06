import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getItems, saveItems } from '../utils/itemStorage'

type Item = {
  id: number
  name: string
  email: string
}

export default function CrudPage() {
  const [items, setItems] = useState<Item[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    setItems(getItems())
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (editingId) {
      const updated = items.map(item =>
        item.id === editingId ? { ...item, name, email } : item
      )
      setItems(updated)
      saveItems(updated)
    } else {
      const newItem: Item = {
        id: Date.now(),
        name,
        email,
      }
      const updated = [...items, newItem]
      setItems(updated)
      saveItems(updated)
    }

    setName('')
    setEmail('')
    setEditingId(null)
  }

  function handleEdit(item: Item) {
    setEditingId(item.id)
    setName(item.name)
    setEmail(item.email)
  }

  function handleDelete(id: number) {
    const updated = items.filter(item => item.id !== id)
    setItems(updated)
    saveItems(updated)
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">CRUD Data</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
          <input
            className="w-full border p-2"
            placeholder="Nama"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            className="w-full border p-2"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2">
            {editingId ? 'Update' : 'Tambah'}
          </button>
        </form>

        {/* TABLE */}
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.email}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500">
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
