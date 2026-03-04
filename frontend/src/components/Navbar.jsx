import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-indigo-600">WorkSpace</span>
        <span className="text-gray-300">|</span>
        <span className="text-sm text-gray-500">Canvas Editor</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Hola, <span className="font-semibold text-indigo-600">{user?.name}</span>
        </span>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-50 text-red-600 px-4 py-1.5 rounded-lg hover:bg-red-100 transition font-medium"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}