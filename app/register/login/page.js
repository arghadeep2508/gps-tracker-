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
    <div>
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} />

      <input type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
