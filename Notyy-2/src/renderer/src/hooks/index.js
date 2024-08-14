import { useAtom } from 'jotai'
import { notesAtom, notesNeedSavingAtom } from '../store/state'
const noteTemplate = {
  id: Date.now(),
  title: 'New Note',
  content: '',
  to_do: [{ id: 0, text: 'Right click to add to do list', completed: false }]
}

export const useNotes = () => {
  const [notes, setNotes] = useAtom(notesAtom)
  const [, setNeedsSaving] = useAtom(notesNeedSavingAtom)

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))

    setNotes(updatedNotes)
    setNeedsSaving(true)
  }

  const toggleTodo = (noteId, todoId) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId
        ? {
            ...note,
            to_do: note.to_do.map((todo) =>
              todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
          }
        : note
    )
    setNotes(updatedNotes)
    setNeedsSaving(true)
  }

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: noteTemplate.title,
      content: noteTemplate.content,
      to_do: noteTemplate.to_do.map((todo, index) => ({
        id: index,
        text: todo.text,
        completed: false
      }))
    } // Increment all existing note ID

    try {
      setNotes([newNote, ...notes])
      console.log(notes)
    } catch (err) {
      console.error(err)
    } finally {
      console.log(notes)
      setNeedsSaving(true)
    }

    //save(updatedNotes)
  }

  const addTodo = (noteId, todoText) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId
        ? {
            ...note,
            to_do: [
              ...note.to_do,
              {
                id: note.to_do.length,
                text: todoText,
                completed: false
              }
            ]
          }
        : note
    )
    setNotes(updatedNotes)
    setNeedsSaving(true)

    //save(updatedNotes)
  }

  const deleteTodo = (noteId, todoId) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId
        ? {
            ...note,
            to_do: note.to_do.filter((todo) => todo.id !== todoId)
          }
        : note
    )

    setNotes(updatedNotes)
    setNeedsSaving(true)

    //save(updatedNotes)
  }

  const deleteNote = (noteId) => {
    const filteredNotes = notes.filter((note) => note.id !== noteId)
    // Reorder IDs after deletion
    setNotes(filteredNotes)
    setNeedsSaving(true)

    //save(filteredNotes)
  }

  return {
    notes,
    updateNote,
    toggleTodo,
    addNote,
    deleteNote,
    addTodo,
    deleteTodo
  }
}
