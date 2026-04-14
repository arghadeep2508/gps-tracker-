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

    alert("Registered")
    router.push('/login')
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl w-[350px] shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          type={key === "password" ? "password" : "text"}
          placeholder={key}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-gray-800 border border-gray-700"
        />
      ))}

      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 p-2 rounded mt-3 hover:bg-blue-600"
      >
        Register
      </button>
    </div>
  )
}
