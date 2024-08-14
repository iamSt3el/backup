import React, { ComponentProps } from 'react'
import { X, Check } from 'lucide-react'

export const TodoItem = ({ ...props }: ComponentProps<'div'>) => {
  const { todo } = props
  return (
    <div className="flex items-center space-x-2 py-1">
      <button
        onClick={onToggle}
        className={`w-5 h-5 rounded-full border transition-all duration-300 ${
          todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
        } flex items-center justify-center`}
      >
        {/*todo.completed && <Check size={12} className="text-white" >*/}
      </button>
      <span
        className={`flex-grow text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}
      >
        {todo.text}
      </span>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700 transition-colors">
        <X size={14} />
      </button>
    </div>
  )
}
