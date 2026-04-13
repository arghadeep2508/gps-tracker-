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
    <div>
      <h2>Dashboard</h2>

      <p>Emergency: {profile.emergency_name}</p>
      <p>{profile.emergency_phone}</p>

      <button
        style={{ background: 'red', color: 'white', padding: 20 }}
        onClick={sendSOS}
      >
        SOS
      </button>
    </div>
  )
}
