import { useState } from 'react'
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

const COMPONENT_TYPES = [
  { type: 'text',   label: '📝 Texto',   color: 'bg-yellow-50 border-yellow-300' },
  { type: 'image',  label: '🖼️ Imagen',  color: 'bg-blue-50 border-blue-300' },
  { type: 'button', label: '🔘 Botón',   color: 'bg-green-50 border-green-300' },
  { type: 'card',   label: '🃏 Tarjeta', color: 'bg-purple-50 border-purple-300' },
]

function SidebarItem({ type, label, color }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `sidebar-${type}`, data: { type, fromSidebar: true } })
  return (
    <div
      ref={setNodeRef} {...listeners} {...attributes}
      className={`border-2 rounded-xl px-4 py-3 cursor-grab active:cursor-grabbing font-medium text-sm select-none transition ${color} ${isDragging ? 'opacity-40' : 'hover:shadow-md'}`}
    >
      {label}
    </div>
  )
}

function CanvasItem({ id, type, label, color, position, onDelete }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id, data: { type, fromCanvas: true } })
  return (
    <div
      ref={setNodeRef} {...listeners} {...attributes}
      style={{ position: 'absolute', left: position.x, top: position.y, zIndex: isDragging ? 50 : 10 }}
      className={`border-2 rounded-xl px-4 py-3 cursor-grab active:cursor-grabbing select-none shadow-md min-w-[120px] ${color} ${isDragging ? 'opacity-40' : ''}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <button
          onPointerDown={e => e.stopPropagation()}
          onClick={() => onDelete(id)}
          className="text-gray-400 hover:text-red-500 transition text-xs font-bold"
        >✕</button>
      </div>
    </div>
  )
}

function Canvas({ items, onDelete }) {
  const { setNodeRef } = useDroppable({ id: 'canvas' })
  return (
    <div ref={setNodeRef} className="relative flex-1 bg-white border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden min-h-[500px]">
      {items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-lg select-none pointer-events-none">
          Arrastra componentes aquí
        </div>
      )}
      {items.map(item => (
        <CanvasItem key={item.id} {...item} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default function DraggableCanvas() {
  const [items, setItems] = useState([])
  const [activeData, setActiveData] = useState(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDragStart = ({ active }) => setActiveData(active.data.current)

  const handleDragEnd = ({ active, delta, over }) => {
    setActiveData(null)
    const data = active.data.current

    if (data.fromSidebar && over?.id === 'canvas') {
      const typeInfo = COMPONENT_TYPES.find(c => c.type === data.type)
      setItems(prev => [...prev, {
        id: `item-${Date.now()}`,
        type: data.type,
        label: typeInfo.label,
        color: typeInfo.color,
        position: { x: Math.max(10, Math.random() * 300 + 50), y: Math.max(10, Math.random() * 200 + 50) }
      }])
    }

    if (data.fromCanvas) {
      setItems(prev => prev.map(item =>
        item.id === active.id
          ? { ...item, position: { x: Math.max(0, item.position.x + delta.x), y: Math.max(0, item.position.y + delta.y) } }
          : item
      ))
    }
  }

  const handleDelete = (id) => setItems(prev => prev.filter(item => item.id !== id))

  const activeType = COMPONENT_TYPES.find(c => c.type === activeData?.type)

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 h-full">
        <div className="w-44 flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Componentes</p>
          {COMPONENT_TYPES.map(c => <SidebarItem key={c.type} {...c} />)}
          <div className="mt-4 border-t pt-4">
            <p className="text-xs text-gray-400 text-center">{items.length} elemento{items.length !== 1 ? 's' : ''} en canvas</p>
            {items.length > 0 && (
              <button onClick={() => setItems([])} className="mt-2 w-full text-xs text-red-400 hover:text-red-600 transition">
                Limpiar todo
              </button>
            )}
          </div>
        </div>
        <Canvas items={items} onDelete={onDelete} />
      </div>
      <DragOverlay>
        {activeType && (
          <div className={`border-2 rounded-xl px-4 py-3 font-medium text-sm shadow-xl ${activeType.color}`}>
            {activeType.label}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}