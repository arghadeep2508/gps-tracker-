'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // 🔹 Get logged-in user
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
          alert("User not logged in")
          setLoading(false)
          return
        }

        console.log("User:", user)

        // 🔹 Fetch profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error("Fetch error:", error)
          alert("Error fetching profile")
          setLoading(false)
          return
        }

        console.log("Profile:", data)

        setProfile(data)
        setLoading(false)

      } catch (err) {
        console.error("Unexpected error:", err)
        alert("Something went wrong")
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  // 🚨 SOS FUNCTION
  const sendSOS = () => {
    if (!profile) {
      alert("Profile not loaded")
      return
    }

    if (!navigator.geolocation) {
      alert("Geolocation not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude

        const message = `EMERGENCY 🚨
Name: ${profile.name}
Phone: ${profile.phone}
Age: ${profile.age}
Health: ${profile.health}

Location:
https://maps.google.com/?q=${lat},${lon}`

        console.log("SOS Message:", message)

        // Opens SMS app
        window.location.href =
          `sms:${profile.emergency_phone}?body=${encodeURIComponent(message)}`
      },
      (error) => {
        console.error("GPS Error:", error)
        alert("Unable to get location")
      }
    )
  }

  // ⏳ LOADING UI
  if (loading) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl">Loading...</h2>
      </div>
    )
  }

  // ❌ NO PROFILE
  if (!profile) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-red-500">No profile found</h2>
      </div>
    )
  }

  // ✅ MAIN UI
  return (
    <div className="bg-slate-900 p-6 rounded-2xl w-[350px] mx-auto mt-10 shadow-xl text-center">

      <h2 className="text-2xl font-bold text-blue-400 mb-4">
        Dashboard
      </h2>

      <div className="mb-4">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Health:</strong> {profile.health}</p>
      </div>

      <div className="mb-6">
        <p className="text-gray-400">Emergency Contact</p>
        <p>{profile.emergency_name}</p>
        <p>{profile.emergency_phone}</p>
      </div>

      <button
        onClick={sendSOS}
        className="w-full bg-red-600 p-4 rounded-full text-xl font-bold hover:bg-red-700 animate-pulse"
      >
        🚨 SOS
      </button>

    </div>
  )
}
