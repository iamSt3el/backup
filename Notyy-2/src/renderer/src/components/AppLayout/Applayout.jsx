import PropTypes from 'prop-types'

import styles from './applayout.module.scss'

export const RootLayout = ({ children }) => {
  return <main className={styles.rootLayout}>{children}</main>
}

export const Header = ({ children }) => {
  return <div className={styles.header}>{children}</div>
}

export const Content = ({ children }) => {
  return <div className={styles.content}>{children}</div>
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired
}

Header.propTypes = {
  children: PropTypes.node.isRequired
}

Content.propTypes = {
  children: PropTypes.node.isRequired
}
