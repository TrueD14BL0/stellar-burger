import styles from './AppHeader.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderButton from '../HeaderButton/HeaderButton'
import { Location, useLocation } from 'react-router-dom'
import { FC } from 'react'
import { PAGES } from '../../utils/const'

const AppHeader: FC = () => {

  const location: Location = useLocation();

  return (
    <header className={`${styles.header} pl-80 pr-80 pt-4 pb-4`}>
      <div className={`${styles.content}`}>
        <nav className={`${styles.mainMenu}`}>
          <li className={`${styles.mainMenuListItem}`}>
            <HeaderButton text="Конструктор" linkTo={PAGES.MAIN_PAGE}>
              <BurgerIcon type={location.pathname===PAGES.MAIN_PAGE?'primary':'secondary'}/>
            </HeaderButton>
          </li>
          <li className={`${styles.mainMenuListItem}`}>
            <HeaderButton text="Лента заказов" linkTo={PAGES.FEED_PAGE}>
              <ListIcon type={location.pathname===PAGES.FEED_PAGE?'primary':'secondary'} />
            </HeaderButton>
          </li>
        </nav>
        <Logo />
        <HeaderButton text="Личный кабинет" linkTo={PAGES.PROFILE_PAGE} addClass="toRight">
          <ProfileIcon type={location.pathname===PAGES.PROFILE_PAGE?'primary':'secondary'} />
        </HeaderButton>
      </div>
    </header>
  )
}

export default AppHeader;
