import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const NotesPreview = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={twMerge('h-screen w-screen', className)} {...props}>
      {children}
    </div>
  )
}
