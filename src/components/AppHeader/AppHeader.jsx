import styles from './AppHeader.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderButton from '../HeaderButton/HeaderButton'
import { useLocation } from 'react-router-dom'
import { FEED_PAGE, MAIN_PAGE, PROFILE_PAGE } from '../../utils/const'

const AppHeader = () => {

  const location = useLocation();

  return (
    <header className={`${styles.header} pl-80 pr-80 pt-4 pb-4`}>
      <div className={`${styles.content}`}>
        <nav className={`${styles.mainMenu}`}>
          <li className={`${styles.mainMenuListItem}`}>
            <HeaderButton text="Конструктор" linkTo={MAIN_PAGE}>
              <BurgerIcon type={location.pathname===MAIN_PAGE?'primary':'secondary'}/>
            </HeaderButton>
          </li>
          <li className={`${styles.mainMenuListItem}`}>
            <HeaderButton text="Лента заказов" linkTo={FEED_PAGE}>
              <ListIcon type={location.pathname===FEED_PAGE?'primary':'secondary'} />
            </HeaderButton>
          </li>
        </nav>
        <Logo />
        <HeaderButton text="Личный кабинет" linkTo={PROFILE_PAGE} addClass="toRight">
          <ProfileIcon type={location.pathname===PROFILE_PAGE?'primary':'secondary'} />
        </HeaderButton>
      </div>
    </header>
  )
}

export default AppHeader;
