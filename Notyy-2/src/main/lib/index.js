import Store from 'electron-store'

class NoteManager {
  constructor() {
    this.store = new Store({
      name: 'sticky-notes',
      fileExtension: 'data'
    })
  }

  getAllNotes() {
    return this.store.get('notes', [])
  }

  saveAllNotes(notes) {
    if (Array.isArray(notes)) {
      this.store.set('notes', notes)
      return true
    }
    return false
  }
}

export default NoteManager
