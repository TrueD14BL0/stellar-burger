import styles from './MainContent.module.css';
import PropTypes from 'prop-types';

const MainContent = ({children}) => {
  return (
    <main className={styles.content}>
      {children}
    </main>
  )
}

MainContent.propTypes = {
  children: PropTypes.element.isRequired,
}

export default MainContent;
