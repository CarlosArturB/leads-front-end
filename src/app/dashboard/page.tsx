'use client'

import { Router } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Lead {
  id: number
  name: string
  email: string
  phone: string
  leadorigin: string
}

export default function Dashboard() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])  // estado para leads com tipagem
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    try {
      const res = await fetch('http://localhost:3006/leads', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('JWTLOCALSTORAGE') || ''}`, // Adiciona o token JWT no header
      }})

      const data: Lead[] = await res.json()

      data.sort((a, b) => b.id - a.id) // ordena decrescente pelo id


      setLeads(data)
    } catch (err) {
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleRedirectUsers = () => {
    router.push('/usuarios')
  }

  const handleLpClick = () => {
    alert('Botão LP clicado!')
  }

  return (
    <div className="p-8">
      <button
        onClick={handleLpClick}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mb-4"
      >
        LP
      </button>

      <button
        onClick={handleRedirectUsers}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-6"
      >
        Ir para Usuários
      </button>

      <h1 className="text-2xl font-bold mb-4">Leads</h1>

      {loading && <p>Carregando leads...</p>}

      {!loading && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Lead Origin</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Nenhum lead encontrado.
                </td>
              </tr>
            )}
            {leads.map(({ id, name, email, phone, leadorigin }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{id}</td>
                <td className="border border-gray-300 px-4 py-2">{name}</td>
                <td className="border border-gray-300 px-4 py-2">{email}</td>
                <td className="border border-gray-300 px-4 py-2">{phone}</td>
                <td className="border border-gray-300 px-4 py-2">{leadorigin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
