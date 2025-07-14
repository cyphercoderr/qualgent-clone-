"use client"

import { useEffect } from "react"
import { X, CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react"

interface ToastProps {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  description?: string
  onRemove: (id: string) => void
}

export function Toast({ id, type, title, description, onRemove }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), 5000)
    return () => clearTimeout(timer)
  }, [id, onRemove])

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  }

  const Icon = icons[type]

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border shadow-lg max-w-sm ${colors[type]}`}>
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          {description && <p className="text-sm mt-1">{description}</p>}
        </div>
        <button onClick={() => onRemove(id)} className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
