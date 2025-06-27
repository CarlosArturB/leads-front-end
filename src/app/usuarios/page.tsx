'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  name: string
  email: string
}

export default function Usuarios() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3006/users')
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        console.error('Erro ao buscar usuários:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

   const handleRedirectUsers = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Usuários</h1>
      <button
        onClick={handleRedirectUsers}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mb-4"
      >
        Dashboard
      </button>
      {loading ? (
        <p>Carregando usuários...</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user, index) => (
            <li
              key={index}
              className="bg-white shadow p-4 rounded border border-gray-200"
            >
              <p className="font-semibold">Nome: {user.name}</p>
              <p className="text-gray-600">Email: {user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
