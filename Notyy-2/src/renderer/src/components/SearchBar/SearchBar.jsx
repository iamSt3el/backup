import styles from './searchBar.module.scss'
import { Search } from 'lucide-react'
import PropTypes from 'prop-types'

function SearchBar({ value, onChange }) {
  return (
    <div className={styles.container}>
      <Search size={20} />
      <input type="search" placeholder="Search" value={value} onChange={onChange} />
    </div>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SearchBar
