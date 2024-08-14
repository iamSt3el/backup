import { useState } from 'react'
import styles from './navbar.module.scss'
import { Menu, Moon, Sun } from 'lucide-react'

export const Navbar = () => {
  const [isDark, setIsDark] = useState(false)

  const handleClose = () => {
    window.api?.closeApp()
  }

  const handleMinimize = () => {
    window.api?.minimizeApp()
  }

  const toggleButton = () => {
    setIsDark(!isDark)
  }
  return (
    <div className={styles.outerBox}>
      <div className={styles.topBar}>
        <div className={styles.flex_container}>
          <div className={styles.button_group}>
            <button className={styles.minimize} onClick={handleMinimize}></button>
            <button className={styles.close} onClick={handleClose}></button>
          </div>
        </div>
      </div>
      <div className={styles.nav}>
        <h1>Notty</h1>
        <div className={styles.buttonBox}>
          <button onClick={toggleButton}>{isDark ? <Sun size={30} /> : <Moon size={30} />}</button>

          <button>
            <Menu size={30} />
          </button>
        </div>
      </div>
    </div>
  )
}
