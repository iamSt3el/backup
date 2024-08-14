import React from 'react'

export const DraggableTopBar: React.FC = () => {
  const handleClose = () => {
    window.context?.closeApp()
  }

  const handleMinimize = () => {
    window.context?.minimizeApp()
  }

  const handleMaximize = () => {
    window.context?.maximizeApp()
  }

  return (
    <header className="absolute inset-x-0 top-0 h-8 bg-transparent flex items-center">
      <div className="flex items-center ml-2 space-x-2">
        <button
          onClick={handleClose}
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"
        />
        <button
          onClick={handleMinimize}
          className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 focus:outline-none"
        />
        <button
          onClick={handleMaximize}
          className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none"
        />{' '}
      </div>
    </header>
  )
}
