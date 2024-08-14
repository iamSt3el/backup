import styles from './addButton.module.scss'
import { PlusCircle } from 'lucide-react'
import { useNotes } from '../../hooks'

export const AddButton = () => {
  const { addNote } = useNotes()

  return (
    <div className={styles.container}>
      <button className={styles.addButton} onClick={addNote}>
        <PlusCircle size={20} className="mr-2" />
        Add Note
      </button>
    </div>
  )
}
