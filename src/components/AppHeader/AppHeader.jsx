import styles from './AppHeader.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderButton from '../HeaderButton/HeaderButton'
import { useLocation } from 'react-router-dom'

const AppHeader = () => {

  const location = useLocation();

  return (
    <header className={`${styles.header} pl-80 pr-80 pt-4 pb-4`}>
      <nav className={`${styles.mainMenu}`}>
        <li className={`${styles.mainMenuListItem}`}>
          <HeaderButton text="Конструктор" linkTo="/">
            <BurgerIcon type={location.pathname==="/"?'primary':'secondary'}/>
          </HeaderButton>
        </li>
        <li className={`${styles.mainMenuListItem}`}>
          <HeaderButton text="Лента заказов" linkTo="/feed">
            <ListIcon type={location.pathname==="/feed"?'primary':'secondary'} />
          </HeaderButton>
        </li>
      </nav>
      <Logo />
      <HeaderButton text="Личный кабинет" linkTo="/profile">
        <ProfileIcon type={location.pathname==="/profile"?'primary':'secondary'} />
      </HeaderButton>
    </header>
  )
}

export default AppHeader;
