import styles from './todoItem.module.scss'
import PropTypes from 'prop-types'

export const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={styles.todoItem}>
      <div
        className={`${styles.toggleButton} ${todo.completed ? styles.completed : ''}`}
        onClick={onToggle}
      >
        {todo.completed && '✓'}
      </div>
      <span className={`${styles.text} ${todo.completed ? styles.completed : ''}`}>
        {todo.text}
      </span>
      <div className={styles.deleteButton} onClick={onDelete}>
        ✕
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
