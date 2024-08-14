import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-col h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Header = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside className={twMerge('', className)} {...props}>
      {children}
    </aside>
  )
}

export const Content = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={twMerge('flex-grow', className)} {...props}>
      {children}
    </div>
  )
}
