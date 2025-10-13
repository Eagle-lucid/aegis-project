'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ThronePage() {
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        
        // You can use data.session to check authentication status
        if (data.session) {
          console.log('User is authenticated:', data.session.user.email)
        } else {
          console.log('No active session')
        }
        
        setConnected(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Connection failed')
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🦅 Welcome, Sovereign
        </h1>
        
        <div className="mt-8 p-4 rounded bg-slate-800">
          {connected ? (
            <p className="text-green-400">✓ Supabase Connected</p>
          ) : error ? (
            <p className="text-red-400">✗ Error: {error}</p>
          ) : (
            <p className="text-yellow-400">⏳ Checking connection...</p>
          )}
        </div>

        <p className="text-gray-400 mt-8">
          The Throne Room is being constructed...
        </p>
      </div>
    </div>
  )
}