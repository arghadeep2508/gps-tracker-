'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) return alert(error.message)

    router.push('/dashboard')
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl w-[350px] shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  )
}
