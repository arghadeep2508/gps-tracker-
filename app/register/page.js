'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    age: '', health: '',
    emergency_name: '', emergency_phone: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    })

    if (error) return alert(error.message)

    await supabase.from('profiles').insert({
      id: data.user.id,
      ...form
    })

    alert("Registered Successfully")
    router.push('/login')
  }

  return (
    <div>
      <h2>Register</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          type={key === "password" ? "password" : "text"}
          placeholder={key}
          onChange={handleChange}
        />
      ))}

      <button onClick={handleRegister}>Register</button>
    </div>
  )
}
