'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Dashboard() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(data)
    }

    load()
  }, [])

  const sendSOS = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude

      const msg = `EMERGENCY 🚨
Name: ${profile.name}
Phone: ${profile.phone}
Age: ${profile.age}
Health: ${profile.health}

https://maps.google.com/?q=${lat},${lon}`

      window.location.href =
        `sms:${profile.emergency_phone}?body=${encodeURIComponent(msg)}`
    })
  }

  if (!profile) return <p>Loading...</p>

  return (
    <div className="bg-slate-900 p-6 rounded-2xl w-[350px] text-center shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-blue-400">
        Dashboard
      </h2>

      <p className="mb-1">Emergency Contact</p>
      <p className="mb-4 text-gray-400">
        {profile.emergency_name} ({profile.emergency_phone})
      </p>

      <button
        onClick={sendSOS}
        className="w-full bg-red-600 p-4 rounded-full text-xl font-bold hover:bg-red-700 animate-pulse"
      >
        🚨 SOS
      </button>
    </div>
  )
}
