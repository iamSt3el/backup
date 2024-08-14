import { NoteInfo } from '@shared/models'

export const notesMock: NoteInfo[] = [
  {
    id: 1,
    title: 'Meeting Notes',
    content: 'Discuss project timeline',
    to_do: [
      { id: 1, text: 'Prepare presentation', completed: false },
      { id: 2, text: 'Send follow-up email', completed: true }
    ]
  },

  {
    id: 2,
    title: 'Meeting Notes',
    content: 'Discuss project timeline',
    to_do: [
      { id: 1, text: 'Prepare presentation', completed: false },
      { id: 2, text: 'Send follow-up email', completed: true }
    ]
  }
]
