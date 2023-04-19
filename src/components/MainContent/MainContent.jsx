import styles from './MainContent.module.css';
import PropTypes, { element } from 'prop-types';
import { MAIN_CONTENT_GAP_STD } from '../../utils/const';

const MainContent = ({children, gap = MAIN_CONTENT_GAP_STD}) => {
  return (
    <main className={`${styles.content} ${styles[gap]}`}>
      {children}
    </main>
  )
}

MainContent.propTypes = {
  children: PropTypes.arrayOf(element).isRequired,
  gap: PropTypes.string,
}

export default MainContent;
