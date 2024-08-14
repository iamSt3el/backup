import { ComponentProps } from 'react'
import { NewNoteButton, DeleteNoteButton } from '@/components'

export const ActionButtonRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
