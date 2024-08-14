import { atom } from 'jotai'
import { notesMock } from './mocks'
import { NoteInfo } from '@shared/models'

const loadNotes = () => {
  const notes = notesMock
  console.info(notes)
  return notes
}

const notesAtom = atom<NoteInfo[]>(loadNotes())
