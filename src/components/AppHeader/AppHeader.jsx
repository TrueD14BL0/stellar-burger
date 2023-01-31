import styles from './AppHeader.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderButton from '../HeaderButton/HeaderButton'

const AppHeader = () => {
  return (
    <header className={`${styles.header} pl-80 pr-80 pt-4 pb-4`}>
      <nav className={`${styles.mainMenu}`}>
        <li className={`${styles.mainMenuListItem}`}>
          <HeaderButton text="Конструктор" addedClass={`${styles.headerActiveBtn}`}>
            <BurgerIcon type='primary'/>
          </HeaderButton>
        </li>
        <li className={`${styles.mainMenuListItem}`}>
          <HeaderButton text="Лента заказов" addedClass={`${styles.headerInactiveBtn}`}>
            <ListIcon type='secondary' />
          </HeaderButton>
        </li>
      </nav>
      <Logo />
      <HeaderButton text="Личный кабинет" addedClass={`${styles.headerInactiveBtn}`}>
        <ProfileIcon type='secondary' />
      </HeaderButton>
    </header>
  )
}

export default AppHeader;
