import { useEffect } from 'react'
import { notesAtom, notesNeedSavingAtom } from '../store/state'
import { useAtom } from 'jotai'

const AUTOSAVE_INTERVAL = 10 // 5 seconds

const serializeNotes = (notes) => {
  if (!Array.isArray(notes)) {
    console.error('Notes is not an array:', notes)
    return []
  }
  return notes.map((note) => ({
    id: note.id,
    title: note.title,
    content: note.content,
    to_do: note.to_do.map((todo) => ({
      id: todo.id,
      text: todo.text,
      completed: todo.completed
    }))
  }))
}

export const AutoSave = () => {
  const [notes] = useAtom(notesAtom)
  const [needsSaving, setNeedsSaving] = useAtom(notesNeedSavingAtom)

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (needsSaving) {
        try {
          const serializableNotes = serializeNotes(notes)
          console.log(serializableNotes)
          await window.api.saveAllNotes(serializableNotes)
          setNeedsSaving(false)
        } catch (error) {
          console.error('Failed to auto-save notes:', error)
        }
      }
    }, AUTOSAVE_INTERVAL)

    return () => clearInterval(intervalId)
  }, [notes, needsSaving, setNeedsSaving])

  return null
}
