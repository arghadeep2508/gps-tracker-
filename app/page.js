export default function Home() {
  return (
    <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-center w-[350px]">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        SafeSphere
      </h1>

      <a href="/register">
        <button className="w-full bg-blue-500 p-3 rounded-xl mb-4 hover:bg-blue-600">
          Register
        </button>
      </a>

      <a href="/login">
        <button className="w-full bg-gray-700 p-3 rounded-xl hover:bg-gray-600">
          Login
        </button>
      </a>
    </div>
  )
}
