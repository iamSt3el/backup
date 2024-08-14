import { Note } from '../Note/Note'
import styles from './notesPreview.module.scss'
import Masonry from 'react-responsive-masonry'
import { useNotes } from '../../hooks'
import { AddButton } from '../AddButton/AddButton'
import SearchBar from '../SearchBar/SearchBar'
import { useState } from 'react'

export const NotesPreview = () => {
  const [searchText, setSearchText] = useState('')
  const { notes, updateNote } = useNotes()

  const filteredNotes = notes.filter((note) => {
    // If there's no search text, include all notes
    if (!searchText) return true
    // Convert search text to lowercase for case-insensitive comparison
    const lowerSearchText = searchText.toLowerCase()
    // Check if the note has a title and if it matches the search text
    const titleMatch = note.title && note.title.toLowerCase().includes(lowerSearchText)
    // Check if the note has content and if it matches the search text
    const contentMatch = note.content && note.content.toLowerCase().includes(lowerSearchText)
    // Include the note if either title or content matches
    return titleMatch || contentMatch
  })

  if (!Array.isArray(notes)) {
    console.error('Notes is not an array:', notes)
    return <div>No notes available</div>
  }
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <SearchBar value={searchText} onChange={(ev) => setSearchText(ev.target.value)} />
        <AddButton />
      </div>
      <div className={styles.content}>
        <Masonry columnsCount={3} gutter="30px">
          {filteredNotes.map((note, index) => (
            <Note key={index} note={note} onUpdate={updateNote} />
          ))}
        </Masonry>
      </div>
    </div>
  )
}
