import styles from './MainContent.module.css';
import { MAIN_CONTENT_GAP } from '../../utils/const';
import { FC, ReactNode } from 'react';

interface IMainContent {
  children: ReactNode[],
  gap: string,
}

const MainContent: FC<IMainContent> = ({children, gap = MAIN_CONTENT_GAP.MAIN_CONTENT_GAP_STD}) => {
  return (
    <main className={`${styles.content} ${styles[gap]}`}>
      {children}
    </main>
  )
}

export default MainContent;
