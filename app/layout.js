export const metadata = {
  title: "GPS Tracker",
  description: "Emergency Safety App"
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ fontFamily: 'Arial', padding: 20 }}>
        {children}
      </body>
    </html>
  )
}
