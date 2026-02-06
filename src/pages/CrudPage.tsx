import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getItems, saveItems } from '../utils/itemStorage'
import { useSearchParams } from 'react-router-dom'
import type { Item } from '../types/item'

export default function CrudPage() {
    const [items, setItems] = useState<Item[]>([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [editingId, setEditingId] = useState<number | null>(null)

    const [params, setParams] = useSearchParams()

    const search = params.get('search') || ''
    const page = Number(params.get('page')) || 1

    const ITEMS_PER_PAGE = 5

    useEffect(() => {
        setItems(getItems())
    }, [])

    function updateParams(newSearch: string, newPage: number) {
        setParams({
            search: newSearch,
            page: String(newPage),
        })
    }

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

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)


    const paginatedItems = filteredItems.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Navbar />
            <div className="p-6 max-w-3xl mx-auto dark:text-white">
                <h1 className="text-2xl font-bold mb-4">CRUD Data</h1>
                <input
                    className="w-full border p-2 mb-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Cari nama atau email..."
                    value={search}
                    onChange={e => updateParams(e.target.value, 1)}
                />

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
                <table className="w-full border dark:border-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="border p-2">Nama</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="dark:bg-gray-900">
                        {paginatedItems.map(item => (
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

                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                        <button
                            key={num}
                            onClick={() => updateParams(search, num)}
                            className={`px-3 py-1 border rounded transition ${page === num ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
