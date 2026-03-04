import Navbar from '../components/Navbar'
import DraggableCanvas from '../components/DraggableCanvas'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Bienvenido, <span className="text-indigo-600">{user?.name}</span> 👋
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Arrastra y suelta componentes desde el panel izquierdo hacia el canvas.
          </p>
        </div>
        <div className="flex-1">
          <DraggableCanvas />
        </div>
      </div>
    </div>
  )
}