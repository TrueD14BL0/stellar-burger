import styles from './MainContent.module.css';
import PropTypes, { element } from 'prop-types';

const MainContent = ({children}) => {
  return (
    <main className={styles.content}>
      {children}
    </main>
  )
}

MainContent.propTypes = {
  children: PropTypes.arrayOf(element).isRequired,
}

export default MainContent;
