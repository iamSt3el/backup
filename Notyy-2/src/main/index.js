import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let noteManager

async function initializeNoteManager() {
  const NoteManagerModule = await import('../main/lib/index')
  const NoteManager = NoteManagerModule.default
  noteManager = new NoteManager()
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1020,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    frame: false,
    center: true,
    transparent: true,
    title: 'Nebula',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      devTools: true,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createStickyNoteWindow(noteId, x, y) {
  const stickyNote = new BrowserWindow({
    width: 200,
    height: 200,
    x: x,
    y: y,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  })
}

stickyNote.webContents.on('did-finish-load', () => {
  console.log(noteId)
  stickyNote.webContents.send('set-sticky-note-content', stickyNote.id, noteId, null)
  // Add this: Resize the window after content is loaded
  stickyNote.webContents
    .executeJavaScript(
      `
    try {
      const contentHeight = document.body.scrollHeight;
      const contentWidth = document.body.scrollWidth;
      window.electronAPI.resizeStickyNote(contentWidth, contentHeight);
    } catch (error) {
      console.error('Error in executeJavaScript:', error);
    }
  `
    )
    .catch((error) => {
      console.error('Failed to execute JavaScript in renderer:', error)
    })
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  await initializeNoteManager()
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.on('minimize-app', () => {
    BrowserWindow.getFocusedWindow()?.minimize()
  })
  ipcMain.on('close-app', () => {
    app.quit()
  })

  ipcMain.handle('getAllNotes', () => {
    return noteManager.getAllNotes()
  })

  ipcMain.handle('saveNote', (event, note) => {
    return noteManager.saveNote(note)
  })

  ipcMain.handle('saveAllNotes', async (event, notes) => {
    return noteManager.saveAllNotes(notes)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
