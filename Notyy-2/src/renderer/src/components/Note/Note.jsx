import { useEffect, useRef, useState } from 'react'
import { Maximize2, X } from 'lucide-react'
import PropTypes from 'prop-types'
import styles from './note.module.scss'
import { TodoItem } from '../TodoItem/TodoItem'
import { useNotes } from '../../hooks'

export const Note = ({ note, onUpdate }) => {
  const [showTodoList, setShowTodoList] = useState(false)
  const [todoListPosition, setTodoListPosition] = useState({ x: 0, y: 0 })
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [newTodo, setNewTodo] = useState('')
  const noteRef = useRef(null)
  const textareaRef = useRef(null)
  const { toggleTodo, deleteNote, addTodo, deleteTodo } = useNotes()

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [note])

  const handleRightClick = (e) => {
    e.preventDefault()
    const rect = noteRef.current.getBoundingClientRect()
    setTodoListPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setShowTodoList(true)
  }

  const handleClickOutside = (e) => {
    if (noteRef.current && !noteRef.current.contains(e.target)) {
      setShowTodoList(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleAddTodo = (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(note.id, newTodo)
      setNewTodo('')
    }
  }

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle)
    onUpdate({ ...note, title: newTitle })
  }

  const handleDeleteTodo = (to_doId) => {
    deleteTodo(note.id, to_doId)
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [content])

  const handleContentChange = (newContent) => {
    setContent(newContent)
    onUpdate({ ...note, content: newContent })
    adjustTextareaHeight()
  }

  const handleToggleTodo = (todoId) => {
    toggleTodo(note.id, todoId)
  }

  const handleDelete = () => {
    deleteNote(note.id)
  }

  return (
    <div ref={noteRef} className={styles.container} onContextMenu={handleRightClick}>
      <div className={styles.note_header}>
        <input
          value={title}
          className={styles.note_title}
          onChange={(ev) => handleTitleChange(ev.target.value)}
        />
        <div className={styles.note_buttons}>
          <button className={`${styles.icon_button} ${styles.pop_out}`}>
            <Maximize2 size={16} />
          </button>
          <button className={`${styles.icon_button} ${styles.close_button}`} onClick={handleDelete}>
            <X size={16} />
          </button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={content}
        className={styles.note_content}
        onChange={(ev) => handleContentChange(ev.target.value)}
      />
      <div className={styles.todo_list}>
        <h4 className={styles.todo_list_title}>To-Do List</h4>
        {note.to_do.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggleTodo(todo.id)}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </div>
      {showTodoList && (
        <div
          className={styles.todo_add_container}
          style={{
            left: `${todoListPosition.x}px`,
            top: `${todoListPosition.y}px`
          }}
        >
          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task"
              className={styles.todo_input}
            />
            <button type="submit" className={styles.todo_add_button}>
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    to_do: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
      })
    ).isRequired
  }).isRequired,
  onUpdate: PropTypes.func.isRequired
}
