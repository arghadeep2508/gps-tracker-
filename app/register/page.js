'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    health: '',
    emergency_name: '',
    emergency_phone: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handle register
  const handleRegister = async () => {
    setLoading(true)

    // STEP 1: SIGN UP USER
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    })

    if (error) {
      alert("Signup Error: " + error.message)
      setLoading(false)
      return
    }

    // 🔴 IMPORTANT DEBUG
    console.log("Auth Data:", data)

    // STEP 2: CHECK USER
    if (!data.user) {
      alert("User not created. Disable email confirmation in Supabase.")
      setLoading(false)
      return
    }

    // STEP 3: INSERT INTO DATABASE
    const { error: insertError } = await supabase
      .from('profiles')
      .insert([
        {
          id: data.user.id,
          name: form.name,
          phone: form.phone,
          email: form.email,
          age: form.age,
          health: form.health,
          emergency_name: form.emergency_name,
          emergency_phone: form.emergency_phone
        }
      ])

    // STEP 4: HANDLE INSERT ERROR
    if (insertError) {
      console.error("Insert Error:", insertError)
      alert("Insert failed: " + insertError.message)
      setLoading(false)
      return
    }

    alert("Registered Successfully ✅")

    setLoading(false)
    router.push('/login')
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl w-[350px] shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange}
        className="w-full p-2 mb-2 rounded bg-gray-800" />

      <input name="phone" placeholder="Phone" onChange={handleChange}
        className="w-full p-2 mb-2 rounded bg-gray-800" />

      <input name="email" placeholder="Email" onChange={handleChange}
        className="w-full p-2 mb-2 rounded bg-gray-800" />

      <input name="age" placeholder="Age" onChange={handleChange}
        className="w-full p-2 mb-2 rounded bg-gray-800" />

      <input name="health" placeholder="Health Condition" onChange={handleChange}
        className="w-full p-2 mb-2 rounded bg-gray-800" />

      <input name="emergency_name" placeholder="Emergency Name" onChange={handleChange}
        className="w-full p-2 mb-2 rounded bg-gray-800" />

      <input name="emergency_phone" placeholder="Emergency Phone" onChange={handleChange}
        className="w-full p-2 mb-2 rounded bg-gray-800" />

      <input type="password" name="password" placeholder="Password" onChange={handleChange}
        className="w-full p-2 mb-2 rounded bg-gray-800" />

      <button
        onClick={handleRegister}
        disabled={loading}
        className="w-full bg-blue-500 p-2 rounded mt-3 hover:bg-blue-600"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  )
}
