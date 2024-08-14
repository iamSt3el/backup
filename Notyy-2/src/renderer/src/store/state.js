import { atom } from 'jotai'

const loadNotes = async () => {
  const notes = await window.api.getAllNotes()
  return notes
}

export const notesAtom = atom(loadNotes())

export const notesNeedSavingAtom = atom(false)
