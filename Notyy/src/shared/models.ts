export type TodoItem = {
  id: number
  text: string
  completed: boolean
}

export type NoteInfo = {
  id: number
  title: string
  content: string
  to_do: TodoItem[]
}
