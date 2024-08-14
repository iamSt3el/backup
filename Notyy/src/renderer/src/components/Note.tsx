import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import { X, Maximize2 } from 'lucide-react'
import { TodoItem } from './TodoItem'

export const Note = ({ ...props }: ComponentProps<'div'>) => {
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const noteRef = useRef(null)

  return (
    <div
      {...props}
      ref={noteRef}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-72 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 relative"
    >
      <div className="flex justify-between items-center mb-2">
        <input
          value={note.title}
          className="font-bold text-gray-800 dark:text-gray-200 bg-transparent border-none focus:outline-none"
        />
        <div className="flex space-x-2">
          <button className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
            <Maximize2 size={16} />
          </button>
          <button className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
      <textarea
        value={note.content}
        className="w-full h-32 mb-2 text-sm text-gray-700 dark:text-gray-300 bg-transparent border-none resize-none focus:outline-none"
      />
      <div className="border-t border-gray-300 dark:border-gray-700 pt-2">
        <h4 className="font-semibold text-sm mb-1 text-gray-800 dark:text-gray-200">To-Do List</h4>
        {note.todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </div>
      {showContextMenu && (
        <div
          style={{
            position: 'absolute',
            left: `${contextMenuPosition.x}px`,
            top: `${contextMenuPosition.y}px`,
            zIndex: 10
          }}
          className="bg-white dark:bg-gray-800 rounded-md shadow-lg py-1"
        >
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Add Todo
          </button>
        </div>
      )}
    </div>
  )
}
